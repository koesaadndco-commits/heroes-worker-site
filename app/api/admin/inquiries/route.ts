import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/adminAuth";
import { getInquiries, isStoreConfigured } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const inquiries = await getInquiries(100);
  return NextResponse.json({
    inquiries,
    storeConfigured: isStoreConfigured(),
  });
}
