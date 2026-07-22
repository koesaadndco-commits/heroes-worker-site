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
              {site.tagline}溶接・金属加工のことなら Heroes Worker
              におまかせください。
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h4>Menu</h4>
              <Link href="/#services">事業内容</Link>
              <Link href="/#strengths">強み</Link>
              <Link href="/works">施工事例</Link>
              <Link href="/#company">会社概要</Link>
            </div>
            <div className="foot-col">
              <h4>Contact</h4>
              <Link href="/#contact">お問い合わせ</Link>
              <a href={site.contact.telHref}>{site.contact.tel}</a>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          © {new Date().getFullYear()} {site.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
