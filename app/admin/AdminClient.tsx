"use client";
import { useCallback, useEffect, useState } from "react";

type Inquiry = {
  name: string;
  email: string;
  tel: string;
  message: string;
  at: string;
};

function fmtDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const p = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())} ${p(
      d.getHours()
    )}:${p(d.getMinutes())}`;
  } catch {
    return iso;
  }
}

export default function AdminClient() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  // ログインフォーム
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // ダッシュボード状態
  const [isRecruiting, setIsRecruiting] = useState(false);
  const [storeConfigured, setStoreConfigured] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // サイト基本情報の編集
  const emptySite = { hours: "", tel: "", email: "", zip: "", addressLine: "" };
  const [siteVals, setSiteVals] = useState({ ...emptySite });
  const [savingSite, setSavingSite] = useState(false);
  const [siteMsg, setSiteMsg] = useState("");

  const loadData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [s, q, si] = await Promise.all([
        fetch("/api/admin/state", { cache: "no-store" }),
        fetch("/api/admin/inquiries", { cache: "no-store" }),
        fetch("/api/admin/site", { cache: "no-store" }),
      ]);
      if (s.status === 401 || q.status === 401 || si.status === 401) {
        setAuthed(false);
        return;
      }
      if (s.ok) {
        const sj = await s.json();
        setIsRecruiting(!!sj.isRecruiting);
        setStoreConfigured(!!sj.storeConfigured);
      }
      if (q.ok) {
        const qj = await q.json();
        setInquiries(Array.isArray(qj.inquiries) ? qj.inquiries : []);
      }
      if (si.ok) {
        const sij = await si.json();
        if (sij.values) setSiteVals({ ...emptySite, ...sij.values });
      }
      setAuthed(true);
    } finally {
      setLoadingData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 初回：ログイン済みか確認
  useEffect(() => {
    (async () => {
      setChecking(true);
      try {
        const res = await fetch("/api/admin/state", { cache: "no-store" });
        if (res.ok) {
          await loadData();
        } else {
          setAuthed(false);
        }
      } catch {
        setAuthed(false);
      } finally {
        setChecking(false);
      }
    })();
  }, [loadData]);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginErr("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "ログインに失敗しました。");
      setPassword("");
      await loadData();
    } catch (err) {
      setLoginErr(err instanceof Error ? err.message : "ログインに失敗しました。");
    } finally {
      setLoggingIn(false);
    }
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  }

  async function toggleRecruiting(next: boolean) {
    setSaving(true);
    setSavedMsg("");
    const prev = isRecruiting;
    setIsRecruiting(next); // 楽観的更新
    try {
      const res = await fetch("/api/admin/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRecruiting: next }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "保存に失敗しました。");
      setSavedMsg("保存しました。サイトに反映されます。");
    } catch (err) {
      setIsRecruiting(prev); // 失敗したら戻す
      setSavedMsg(err instanceof Error ? err.message : "保存に失敗しました。");
    } finally {
      setSaving(false);
    }
  }

  async function saveSite(e: React.FormEvent) {
    e.preventDefault();
    setSavingSite(true);
    setSiteMsg("");
    try {
      const res = await fetch("/api/admin/site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteVals),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "保存に失敗しました。");
      if (json.values) setSiteVals({ ...emptySite, ...json.values });
      setSiteMsg("保存しました。サイトに反映されます（数十秒で反映）。");
    } catch (err) {
      setSiteMsg(err instanceof Error ? err.message : "保存に失敗しました。");
    } finally {
      setSavingSite(false);
    }
  }

  if (checking) {
    return (
      <main className="admin-wrap">
        <p className="admin-muted">読み込み中…</p>
      </main>
    );
  }

  // 未ログイン → ログイン画面
  if (!authed) {
    return (
      <main className="admin-wrap admin-center">
        <div className="admin-card admin-login">
          <h1 className="admin-logo">Heroes Worker</h1>
          <p className="admin-muted">管理コンソール</p>
          <form onSubmit={onLogin}>
            {loginErr && <div className="admin-msg err">{loginErr}</div>}
            <div className="form-field">
              <label>パスワード</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="管理パスワード"
                autoFocus
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary admin-full"
              disabled={loggingIn}
            >
              {loggingIn ? "確認中…" : "ログイン"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ログイン済み → ダッシュボード
  return (
    <main className="admin-wrap">
      <div className="admin-head">
        <div>
          <h1 className="admin-logo">Heroes Worker 管理コンソール</h1>
          <p className="admin-muted">サイトの設定をここから変更できます。</p>
        </div>
        <button className="btn btn-ghost admin-logout" onClick={onLogout}>
          ログアウト
        </button>
      </div>

      {!storeConfigured && (
        <div className="admin-msg warn">
          保存先（KV）が未設定です。切り替えや履歴の保存には Vercel で KV を接続し、再デプロイしてください。
        </div>
      )}

      {/* 募集状態の切替 */}
      <section className="admin-card">
        <h2 className="admin-h2">採用ページの募集状態</h2>
        <p className="admin-muted">
          「募集中」にすると求人要項が表示され、「調整中」にすると
          「採用情報は現在調整中です」の案内に切り替わります。
        </p>
        <div className="admin-toggle">
          <button
            className={`admin-seg ${isRecruiting ? "on" : ""}`}
            onClick={() => toggleRecruiting(true)}
            disabled={saving || !storeConfigured}
          >
            募集中にする
          </button>
          <button
            className={`admin-seg ${!isRecruiting ? "on-dim" : ""}`}
            onClick={() => toggleRecruiting(false)}
            disabled={saving || !storeConfigured}
          >
            調整中にする
          </button>
        </div>
        <p className="admin-status">
          現在の状態：
          <strong className={isRecruiting ? "st-on" : "st-off"}>
            {isRecruiting ? "募集中" : "調整中"}
          </strong>
        </p>
        {savedMsg && <p className="admin-saved">{savedMsg}</p>}
      </section>

      {/* サイト基本情報の編集 */}
      <section className="admin-card">
        <h2 className="admin-h2">サイト基本情報</h2>
        <p className="admin-muted">
          営業時間・電話・メール・住所を編集できます。空欄で保存すると、その項目は初期設定に戻ります。
        </p>
        <form onSubmit={saveSite} className="admin-siteform">
          <div className="form-field">
            <label>営業時間</label>
            <input
              type="text"
              value={siteVals.hours}
              onChange={(e) => setSiteVals({ ...siteVals, hours: e.target.value })}
              placeholder="平日 9:00〜18:00（土日応相談）"
            />
          </div>
          <div className="admin-form-2col">
            <div className="form-field">
              <label>電話番号</label>
              <input
                type="text"
                value={siteVals.tel}
                onChange={(e) => setSiteVals({ ...siteVals, tel: e.target.value })}
                placeholder="090-7081-1130"
              />
            </div>
            <div className="form-field">
              <label>メールアドレス</label>
              <input
                type="text"
                value={siteVals.email}
                onChange={(e) => setSiteVals({ ...siteVals, email: e.target.value })}
                placeholder="example@example.com"
              />
            </div>
          </div>
          <div className="admin-form-2col">
            <div className="form-field">
              <label>郵便番号</label>
              <input
                type="text"
                value={siteVals.zip}
                onChange={(e) => setSiteVals({ ...siteVals, zip: e.target.value })}
                placeholder="923-0004"
              />
            </div>
            <div className="form-field">
              <label>住所</label>
              <input
                type="text"
                value={siteVals.addressLine}
                onChange={(e) =>
                  setSiteVals({ ...siteVals, addressLine: e.target.value })
                }
                placeholder="石川県小松市長崎町4丁目77"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={savingSite || !storeConfigured}
          >
            {savingSite ? "保存中…" : "保存する"}
          </button>
          {siteMsg && <p className="admin-saved">{siteMsg}</p>}
        </form>
      </section>

      {/* お問い合わせ一覧 */}
      <section className="admin-card">
        <div className="admin-h2-row">
          <h2 className="admin-h2">お問い合わせ履歴（{inquiries.length}件）</h2>
          <button className="btn btn-ghost admin-sm" onClick={loadData} disabled={loadingData}>
            {loadingData ? "更新中…" : "最新に更新"}
          </button>
        </div>
        {inquiries.length === 0 ? (
          <p className="admin-muted">
            まだお問い合わせはありません（このコンソール導入後に届いたものが表示されます）。
          </p>
        ) : (
          <div className="admin-inq-list">
            {inquiries.map((q, i) => (
              <div className="admin-inq" key={i}>
                <div className="admin-inq-top">
                  <span className="admin-inq-name">{q.name || "（名前なし）"}</span>
                  <span className="admin-inq-date">{fmtDate(q.at)}</span>
                </div>
                <div className="admin-inq-meta">
                  {q.email && (
                    <a href={`mailto:${q.email}`}>{q.email}</a>
                  )}
                  {q.tel && <span>／ {q.tel}</span>}
                </div>
                <p className="admin-inq-msg">{q.message}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
