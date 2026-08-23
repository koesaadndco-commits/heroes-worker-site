import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/adminAuth";
import { getOverrides, setOverrides, isStoreConfigured, type SiteOverrides } from "@/lib/store";
import { getSiteInfoFresh } from "@/lib/siteConfig";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 編集可能な項目
const FIELDS: (keyof SiteOverrides)[] = ["hours", "tel", "email", "zip", "addressLine"];

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  // 現在の実効値（既定値＋上書き）をフォーム初期値として返す
  const info = await getSiteInfoFresh();
  return NextResponse.json({
    values: {
      hours: info.hours,
      tel: info.tel,
      email: info.email,
      zip: info.zip,
      addressLine: info.addressLine,
    },
    storeConfigured: isStoreConfigured(),
  });
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isStoreConfigured()) {
    return NextResponse.json(
      { error: "保存先（KV）が未設定のため保存できません。" },
      { status: 503 }
    );
  }
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです。" }, { status: 400 });
  }

  // 既存の上書きを取得し、送られてきた項目だけ反映（空欄は既定値に戻す＝キーを削除）
  const current = (await getOverrides()) || {};
  const next: SiteOverrides = { ...current };
  for (const f of FIELDS) {
    if (f in body) {
      const v = typeof body[f] === "string" ? (body[f] as string).trim() : "";
      if (v) next[f] = v;
      else delete next[f];
    }
  }

  const ok = await setOverrides(next);
  if (!ok) {
    return NextResponse.json({ error: "保存に失敗しました。" }, { status: 502 });
  }
  const info = await getSiteInfoFresh();
  return NextResponse.json({ ok: true, values: info });
}
