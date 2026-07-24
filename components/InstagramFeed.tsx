// Instagram Graph API（公式）から最新投稿を取得して表示するサーバーコンポーネント。
// 必要な環境変数（Vercel の Environment Variables に設定・gitには入れない）:
//   IG_USER_ID  … Instagramビジネスアカウントの ID
//   IG_TOKEN    … 長期アクセストークン（約60日有効／自動更新は別途対応可）
// どちらも未設定、または取得に失敗した場合は「現在調整中」表示にフォールバックします。

type IGItem = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
};

async function getFeed(limit = 9): Promise<IGItem[] | null> {
  const userId = process.env.IG_USER_ID;
  const token = process.env.IG_TOKEN;
  if (!userId || !token) return null;

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink";
  const url = `https://graph.facebook.com/v21.0/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`;

  try {
    // 1時間キャッシュ（ISR）。投稿してから最大1時間で反映されます。
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: IGItem[] };
    return json.data && json.data.length > 0 ? json.data : null;
  } catch {
    return null;
  }
}

export default async function InstagramFeed() {
  const items = await getFeed();

  // フォールバック：トークン未設定 or 取得失敗時
  if (!items) {
    return (
      <div className="prep-note">
        <p className="prep-title">施工事例は現在調整中です</p>
        <p className="prep-text">
          写真とコメントを準備しています。今しばらくお待ちください。
        </p>
      </div>
    );
  }

  return (
    <div className="ig-feed">
      <div className="ig-grid">
        {items.map((it) => {
          const src =
            it.media_type === "VIDEO" && it.thumbnail_url
              ? it.thumbnail_url
              : it.media_url;
          return (
            <a
              key={it.id}
              href={it.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-item"
              aria-label={it.caption ? it.caption.slice(0, 60) : "Instagram投稿"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={it.caption ? it.caption.slice(0, 60) : "Instagram投稿"}
                loading="lazy"
              />
              {it.media_type === "VIDEO" && (
                <span className="ig-badge" aria-hidden="true">
                  ▶
                </span>
              )}
            </a>
          );
        })}
      </div>
      <div className="ig-more">
        <a
          href="https://www.instagram.com/heroes_worker/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Instagramでもっと見る（@heroes_worker）→
        </a>
      </div>
    </div>
  );
}
