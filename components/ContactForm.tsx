"use client";
import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "err";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "送信に失敗しました。");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("err");
      setErrMsg(err instanceof Error ? err.message : "送信に失敗しました。");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {status === "ok" && (
        <div className="form-msg ok">
          送信しました。担当者より折り返しご連絡いたします。
        </div>
      )}
      {status === "err" && (
        <div className="form-msg err">
          {errMsg} お手数ですが、お電話（090-7081-1130）でもご連絡いただけます。
        </div>
      )}
      <div className="form-field">
        <label>
          お名前 / 会社名<span className="req">必須</span>
        </label>
        <input type="text" name="name" placeholder="山田 太郎 / 株式会社◯◯" required />
      </div>
      <div className="form-field">
        <label>
          メールアドレス<span className="req">必須</span>
        </label>
        <input type="email" name="email" placeholder="example@example.com" required />
      </div>
      <div className="form-field">
        <label>電話番号</label>
        <input type="tel" name="tel" placeholder="090-1234-5678" />
      </div>
      <div className="form-field">
        <label>
          ご依頼内容<span className="req">必須</span>
        </label>
        <textarea
          name="message"
          placeholder="溶接してほしいもの・素材・数量・希望納期など、わかる範囲でご記入ください。"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
