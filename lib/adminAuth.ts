// 管理コンソールの簡易認証。パスワードは環境変数 ADMIN_PASSWORD に設定。
// ログイン成功時に、パスワードから作った署名トークンを httpOnly Cookie に保存する。
import crypto from "crypto";
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

/** Cookie に保存する署名トークン（パスワードを鍵にした HMAC）。 */
export function sessionToken(): string {
  return crypto
    .createHmac("sha256", secret() || "unset")
    .update("hw-admin-session-v1")
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/** 入力パスワードが正しいか（タイミング攻撃対策つき）。 */
export function verifyPassword(pw: string): boolean {
  const s = secret();
  if (!s) return false;
  return safeEqual(pw, s);
}

/** リクエストの Cookie がログイン済みか。 */
export function isAuthed(req: NextRequest): boolean {
  if (!isAdminConfigured()) return false;
  const c = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!c) return false;
  return safeEqual(c, sessionToken());
}
