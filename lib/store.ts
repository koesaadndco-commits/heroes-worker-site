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
