// データストア：Supabase（PostgREST）を fetch で直接利用。追加パッケージ不要で
// Cloudflare Workers / Vercel の両方で動く。Service Role Key はサーバー側のみで使用。
// 未設定時はサイトが壊れないよう null / 既定値を返す。

function creds() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
}

/** 保存先（Supabase）が設定済みか。 */
export function isStoreConfigured(): boolean {
  return !!creds();
}

type SbInit = RequestInit & { next?: { revalidate: number } };

async function sb(path: string, init: SbInit = {}, revalidate?: number): Promise<Response | null> {
  const c = creds();
  if (!c) return null;
  const headers: Record<string, string> = {
    apikey: c.key,
    Authorization: `Bearer ${c.key}`,
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };
  const opts: SbInit = { ...init, headers };
  if (revalidate != null) opts.next = { revalidate };
  else opts.cache = "no-store";
  try {
    const res = await fetch(`${c.url}/rest/v1/${path}`, opts);
    return res.ok ? res : null;
  } catch {
    return null;
  }
}

// ---- 設定テーブル（key/value）。recruit 状態と site 上書きをここに保存 ----
async function getSetting<T>(key: string, revalidate?: number): Promise<T | null> {
  const res = await sb(
    `hw_settings?key=eq.${encodeURIComponent(key)}&select=value`,
    {},
    revalidate
  );
  if (!res) return null;
  try {
    const rows = (await res.json()) as { value: T }[];
    return rows.length ? rows[0].value : null;
  } catch {
    return null;
  }
}

async function setSetting(key: string, value: unknown): Promise<boolean> {
  const res = await sb("hw_settings?on_conflict=key", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
  });
  return !!res;
}

// ---- 採用ページの募集状態 ----
export type RecruitState = { isRecruiting: boolean };

export async function getRecruitState(): Promise<RecruitState | null> {
  const v = await getSetting<RecruitState>("recruit");
  return v ? { isRecruiting: !!v.isRecruiting } : null;
}

export async function getRecruitStateCached(revalidate = 30): Promise<RecruitState | null> {
  const v = await getSetting<RecruitState>("recruit", revalidate);
  return v ? { isRecruiting: !!v.isRecruiting } : null;
}

export async function setRecruitState(state: RecruitState): Promise<boolean> {
  return setSetting("recruit", { isRecruiting: !!state.isRecruiting });
}

// ---- サイト基本情報の上書き ----
export type SiteOverrides = {
  hours?: string;
  tel?: string;
  email?: string;
  zip?: string;
  addressLine?: string;
};

export async function getOverrides(): Promise<SiteOverrides | null> {
  return getSetting<SiteOverrides>("site_overrides");
}

export async function getOverridesCached(revalidate = 60): Promise<SiteOverrides | null> {
  return getSetting<SiteOverrides>("site_overrides", revalidate);
}

export async function setOverrides(o: SiteOverrides): Promise<boolean> {
  return setSetting("site_overrides", o);
}

// ---- お問い合わせ履歴 ----
export type Inquiry = {
  name: string;
  email: string;
  tel: string;
  message: string;
  at: string; // ISO 文字列（created_at から詰め替え）
};

export async function addInquiry(i: Omit<Inquiry, "at">): Promise<void> {
  await sb("hw_inquiries", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      name: i.name,
      email: i.email,
      tel: i.tel,
      message: i.message,
    }),
  });
}

export async function getInquiries(limit = 100): Promise<Inquiry[]> {
  const res = await sb(
    `hw_inquiries?select=name,email,tel,message,created_at&order=created_at.desc&limit=${limit}`
  );
  if (!res) return [];
  try {
    const rows = (await res.json()) as (Omit<Inquiry, "at"> & { created_at: string })[];
    return rows.map((r) => ({
      name: r.name,
      email: r.email,
      tel: r.tel,
      message: r.message,
      at: r.created_at,
    }));
  } catch {
    return [];
  }
}
