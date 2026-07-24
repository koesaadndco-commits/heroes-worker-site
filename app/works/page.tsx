import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "施工事例",
  description:
    "Heroes Worker（ヒーローズワーカー）の施工事例・実績写真。溶接・金属加工・製缶・オーダー製作などの実績をご紹介します。",
};

export default function WorksPage() {
  return (
    <>
      <Header />

      <div className="page-hero">
        <div className="wrap">
          <span className="kicker">Works</span>
          <h1>施工事例</h1>
          <p>
            これまでに手がけた溶接・金属加工・製作の事例をご紹介します。気になる事例があれば、お気軽にお問い合わせください。
          </p>
          <div className="crumbs">
            <Link href="/">ホーム</Link> ／ 施工事例
          </div>
        </div>
      </div>

      <div className="wrap" style={{ paddingBottom: 40 }}>
        <div className="prep-note">
          <p className="prep-title">施工事例は現在調整中です</p>
          <p className="prep-text">
            写真とコメントを準備しています。公開まで今しばらくお待ちください。
            <br />
            ご相談・お見積もりは随時受け付けておりますので、お気軽にお問い合わせください。
          </p>
          <Link href="/#contact" className="btn btn-ghost">
            お問い合わせはこちら →
          </Link>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="cta">
            <h2>「こんなもの作れる？」をまず相談</h2>
            <p>掲載事例以外のご相談も大歓迎です。お見積もり・ご相談は無料です。</p>
            <Link href="/#contact" className="btn btn-white">
              無料相談・お見積もり →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
