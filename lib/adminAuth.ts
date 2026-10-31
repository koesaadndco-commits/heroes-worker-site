// 管理コンソールの簡易認証。パスワードは環境変数 ADMIN_PASSWORD に設定。
// Cloudflare Workers でも動くよう、Node 専用 API ではなく Web Crypto を使用。
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "hw_admin";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7日間

function secret(): string {
  return process.env.ADMIN_PASSWORD || "";
}

/** パスワードが設定されているか。 */
export function isAdminConfigured(): boolean {
  return secret().length > 0;
}

const encoder = new TextEncoder();

async function hmacHex(key: string, message: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Cookie に保存する署名トークン（パスワードを鍵にした HMAC）。 */
export function sessionToken(): Promise<string> {
  return hmacHex(secret() || "unset", "hw-admin-session-v1");
}

/** 定数時間比較（タイミング攻撃対策）。 */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

/** 入力パスワードが正しいか。 */
export function verifyPassword(pw: string): boolean {
  const s = secret();
  if (!s) return false;
  return safeEqual(pw, s);
}

/** リクエストの Cookie がログイン済みか。 */
export async function isAuthed(req: NextRequest): Promise<boolean> {
  if (!isAdminConfigured()) return false;
  const c = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!c) return false;
  return safeEqual(c, await sessionToken());
}
