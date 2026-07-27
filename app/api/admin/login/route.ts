import { NextRequest, NextResponse } from "next/server";
import {
  verifyPassword,
  isAdminConfigured,
  sessionToken,
  ADMIN_COOKIE,
  COOKIE_MAX_AGE,
} from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "管理パスワードが未設定です（ADMIN_PASSWORD を設定してください）。" },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです。" }, { status: 400 });
  }

  if (!verifyPassword((body.password || "").trim())) {
    return NextResponse.json({ error: "パスワードが違います。" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}
