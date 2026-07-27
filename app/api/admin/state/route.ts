import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/adminAuth";
import { getRecruitState, setRecruitState, isStoreConfigured } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_RECRUITING = false; // KV 未設定時の既定（調整中）

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const storeConfigured = isStoreConfigured();
  const state = await getRecruitState();
  return NextResponse.json({
    isRecruiting: state ? state.isRecruiting : DEFAULT_RECRUITING,
    storeConfigured,
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
  let body: { isRecruiting?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです。" }, { status: 400 });
  }
  const ok = await setRecruitState({ isRecruiting: !!body.isRecruiting });
  if (!ok) {
    return NextResponse.json({ error: "保存に失敗しました。" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, isRecruiting: !!body.isRecruiting });
}
