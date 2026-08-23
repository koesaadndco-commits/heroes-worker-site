// 簡易データストア（Upstash / Vercel KV の REST API を直接叩く実装）。
// 追加パッケージ不要。KV 未設定でもサイトが壊れないよう、その場合は null / 既定値を返す。

function creds() {
  const url =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

/** KV（保存先）が設定済みか。管理画面の案内表示に使用。 */
export function isStoreConfigured(): boolean {
  return !!creds();
}

// 管理系（書き込み・最新取得）：常に最新を読む
async function cmd(args: (string | number)[]): Promise<unknown> {
  const c = creds();
  if (!c) return null;
  try {
    const res = await fetch(c.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${c.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { result?: unknown };
    return json.result ?? null;
  } catch {
    return null;
  }
}

// 公開ページ表示用：ISR でキャッシュ（revalidate 秒ごとに更新）。GET なので Next がキャッシュ可能。
async function readKeyCached(key: string, revalidate: number): Promise<string | null> {
  const c = creds();
  if (!c) return null;
  try {
    const res = await fetch(`${c.url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${c.token}` },
      next: { revalidate },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { result?: unknown };
    return typeof json.result === "string" ? json.result : null;
  } catch {
    return null;
  }
}

// ---- 採用ページの募集状態 ----
export type RecruitState = { isRecruiting: boolean };

export async function getRecruitState(): Promise<RecruitState | null> {
  const r = await cmd(["GET", "recruit:state"]);
  if (typeof r !== "string") return null;
  try {
    const v = JSON.parse(r) as RecruitState;
    return { isRecruiting: !!v.isRecruiting };
  } catch {
    return null;
  }
}

export async function setRecruitState(state: RecruitState): Promise<boolean> {
  const r = await cmd(["SET", "recruit:state", JSON.stringify(state)]);
  return r === "OK";
}

// 公開ページ（採用ページ）用：ISR キャッシュ付きで募集状態を取得
export async function getRecruitStateCached(
  revalidate = 30
): Promise<RecruitState | null> {
  const r = await readKeyCached("recruit:state", revalidate);
  if (r == null) return null;
  try {
    const v = JSON.parse(r) as RecruitState;
    return { isRecruiting: !!v.isRecruiting };
  } catch {
    return null;
  }
}

// ---- サイト基本情報の上書き（会社情報の編集） ----
export type SiteOverrides = {
  hours?: string;
  tel?: string;
  email?: string;
  zip?: string;
  addressLine?: string;
};

const OVERRIDES_KEY = "site:overrides";

function parseOverrides(r: string | null): SiteOverrides | null {
  if (r == null) return null;
  try {
    return JSON.parse(r) as SiteOverrides;
  } catch {
    return null;
  }
}

/** 管理画面用：常に最新の上書き設定を取得 */
export async function getOverrides(): Promise<SiteOverrides | null> {
  const r = await cmd(["GET", OVERRIDES_KEY]);
  return parseOverrides(typeof r === "string" ? r : null);
}

/** 公開ページ用：ISR キャッシュ付きで上書き設定を取得 */
export async function getOverridesCached(
  revalidate = 60
): Promise<SiteOverrides | null> {
  return parseOverrides(await readKeyCached(OVERRIDES_KEY, revalidate));
}

export async function setOverrides(o: SiteOverrides): Promise<boolean> {
  const r = await cmd(["SET", OVERRIDES_KEY, JSON.stringify(o)]);
  return r === "OK";
}

// ---- お問い合わせ履歴 ----
export type Inquiry = {
  name: string;
  email: string;
  tel: string;
  message: string;
  at: string; // ISO 文字列
};

export async function addInquiry(i: Inquiry): Promise<void> {
  await cmd(["LPUSH", "inquiries", JSON.stringify(i)]);
  // 保存件数を上限200件に抑えて無料枠内に収める
  await cmd(["LTRIM", "inquiries", 0, 199]);
}

export async function getInquiries(limit = 100): Promise<Inquiry[]> {
  const r = await cmd(["LRANGE", "inquiries", 0, limit - 1]);
  if (!Array.isArray(r)) return [];
  const out: Inquiry[] = [];
  for (const x of r) {
    if (typeof x !== "string") continue;
    try {
      out.push(JSON.parse(x) as Inquiry);
    } catch {
      /* skip */
    }
  }
  return out;
}
