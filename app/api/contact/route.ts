import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです。" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const tel = (body.tel || "").trim();
  const message = (body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "必須項目が入力されていません。" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || site.contact.email;
  const from = process.env.CONTACT_FROM || "Heroes Worker <onboarding@resend.dev>";

  // メール送信の設定が無い場合は、届いた内容をログに残して成功扱い（設定後に本送信）。
  if (!apiKey) {
    console.log("[contact] RESEND_API_KEY 未設定のため送信スキップ:", {
      name,
      email,
      tel,
      message,
    });
    return NextResponse.json({
      ok: true,
      note: "メール送信は未設定です（RESEND_API_KEY を設定すると実送信されます）。",
    });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `【お問い合わせ】${name} 様`,
      html: `
        <h2>ホームページからのお問い合わせ</h2>
        <p><b>お名前 / 会社名:</b> ${escapeHtml(name)}</p>
        <p><b>メール:</b> ${escapeHtml(email)}</p>
        <p><b>電話:</b> ${escapeHtml(tel || "（未入力）")}</p>
        <p><b>ご依頼内容:</b></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "送信に失敗しました。時間をおいて再度お試しください。" },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] exception:", err);
    return NextResponse.json(
      { error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 }
    );
  }
}
