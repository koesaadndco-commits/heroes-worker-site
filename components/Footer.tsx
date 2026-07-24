import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Heroes Worker" />
            </Link>
            <p>
              {site.tagline}溶接・金属加工のことなら
              <br />
              Heroes Worker におまかせください。
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>Menu</h4>
              <Link href="/#services">事業内容</Link>
              <Link href="/#strengths">強み</Link>
              <Link href="/works">施工事例</Link>
              <Link href="/blog">ブログ</Link>
              <Link href="/recruit">採用情報</Link>
              <Link href="/#company">会社概要</Link>
            </div>
            <div className="foot-col">
              <h4>Contact</h4>
              <Link href="/#contact">お問い合わせ</Link>
              <a href={site.contact.telHref}>{site.contact.tel}</a>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </div>
            <div className="foot-col foot-sns">
              <h4>Instagram</h4>
              <a
                className="qr-card"
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram（@heroes_worker）"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/instagram-qr.svg" alt="Instagram QRコード" />
              </a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                {site.social.instagramHandle}
              </a>
              <span className="qr-note">施工事例を更新中</span>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} {site.name}. All Rights Reserved.</span>
          <span className="foot-credit">Produced by <b>KOESA CO.,LTD.</b></span>
        </div>
      </div>
    </footer>
  );
}
