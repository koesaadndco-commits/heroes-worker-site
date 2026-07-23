import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sparks from "@/components/Sparks";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

const services = [
  { ic: "🔥", title: "各種溶接", desc: "TIG・半自動（MIG/MAG）・被覆アーク溶接に対応。鉄・ステンレス・アルミなど、素材に応じた最適な溶接を行います。" },
  { ic: "⚙️", title: "金属加工・製缶", desc: "切断・曲げ・組立まで一貫対応。架台・フレーム・タンクなど、図面からの製作もお任せください。" },
  { ic: "🚚", title: "出張溶接・修理", desc: "現場での溶接補修や設備の修理にも対応。「ここだけ直したい」という小さなご依頼も歓迎します。" },
  { ic: "📐", title: "オーダーメイド製作", desc: "看板・什器・インテリア金物など、一品物のオーダー製作。アイデアを形にするご相談に乗ります。" },
  { ic: "🏭", title: "工場・設備対応", desc: "生産設備の架台製作やライン改造など、工場の現場ニーズに合わせた金属加工を提供します。" },
  { ic: "🛠️", title: "メンテナンス", desc: "製作後のアフターフォローや定期点検・補修まで。長く安心してお使いいただけるよう支えます。" },
];

const strengths = [
  { num: "01", title: "確かな溶接技術", desc: "美しく強い溶接ビードへのこだわり。難しい素材・形状もご相談ください。" },
  { num: "02", title: "1個から大歓迎", desc: "小ロット・一品物・短納期にも柔軟対応。小さな依頼も丁寧に仕上げます。" },
  { num: "03", title: "明朗な見積もり", desc: "事前にしっかりお見積もり。追加費用の不安なく、安心してご依頼いただけます。" },
];

const stats = [
  { v: "1,200", small: "+", l: "施工実績" },
  { v: "15", small: "年", l: "溶接ひとすじ" },
  { v: "最短", small: "翌日", l: "スピード対応" },
  { v: "3", small: "種", l: "対応溶接工法" },
];

const teaser = [
  "製缶", "ステンレス溶接", "架台製作", "アルミ溶接", "オーダー什器", "現場補修",
];

const flow = [
  { title: "お問い合わせ", desc: "フォーム・電話・メールでご相談ください。図面や写真があるとスムーズです。" },
  { title: "お見積もり", desc: "内容を確認し、無料でお見積もりをご提示します。" },
  { title: "製作・溶接", desc: "ご納得いただいた上で、職人が責任を持って製作します。" },
  { title: "納品・アフター", desc: "納品後のフォローや補修にも対応します。" },
];

export default function Home() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    site.address.mapQuery
  )}&hl=ja&z=16&output=embed`;

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero" id="top">
        <Sparks />
        <div className="wrap hero-grid">
          <Reveal className="hero-copy">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-logo" src="/logo.png" alt="Heroes Worker ロゴ" />
            <h1>
              職人の誇りとプライドを<span className="hl">商品価値</span>へ。<br />
              妥協しない。だから、いつも<span className="hl">最高品質</span>。
            </h1>
            <p className="lead">{site.description}</p>
            <div className="hero-actions">
              <Link href="/#contact" className="btn btn-primary">
                無料で見積もり依頼 →
              </Link>
              <Link href="/works" className="btn btn-ghost">
                施工事例を見る
              </Link>
            </div>
          </Reveal>
          <Reveal className="hero-portrait faded-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/shimizu.png" alt={`代表 ${site.company.rep}`} />
            <span className="hero-portrait-name">代表 清水 寛也</span>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">Services</span>
            <h2>事業内容</h2>
            <p>溶接・金属加工に関するご依頼を幅広く承ります。</p>
          </Reveal>
          <div className="cards">
            {services.map((s) => (
              <Reveal className="card" key={s.title}>
                <div className="ic">{s.ic}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STRENGTHS */}
      <section id="strengths" className="bg-2">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">Why Heroes Worker</span>
            <h2>選ばれる3つの理由</h2>
            <p>確かな腕と誠実な仕事で、お客様の信頼にお応えします。</p>
          </Reveal>
          <div className="features">
            {strengths.map((f) => (
              <Reveal className="feature" key={f.num}>
                <div className="num display">{f.num}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section>
        <div className="wrap">
          <Reveal className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.l}>
                <div className="v display">
                  {s.v}
                  <small>{s.small}</small>
                </div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* WORKS teaser */}
      <section id="works" className="bg-2">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">Works</span>
            <h2>施工事例</h2>
            <p>これまでに手がけた製作・溶接の事例です。</p>
          </Reveal>
          <Reveal className="works">
            {teaser.map((t, i) => (
              <div className="work" key={t}>
                施工写真{i + 1}
                <span className="badge">{t}</span>
              </div>
            ))}
          </Reveal>
          <Reveal style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/works" className="btn btn-ghost">
              施工事例をもっと見る →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FLOW */}
      <section id="flow">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">Flow</span>
            <h2>ご依頼の流れ</h2>
            <p>お問い合わせから納品まで、シンプルな4ステップです。</p>
          </Reveal>
          <Reveal className="flow">
            {flow.map((f) => (
              <div className="step" key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="wrap">
          <Reveal className="cta">
            <h2>「これ、溶接できる？」をまず相談</h2>
            <p>小さな修理から大きな製作まで。お見積もり・ご相談は無料です。</p>
            <Link href="/#contact" className="btn btn-white">
              無料相談・お見積もり →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PHILOSOPHY (経営理念) */}
      <section id="philosophy" className="philosophy">
        <div className="wrap philo-inner">
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="philo-logo" src="/logo.png" alt="Heroes Worker" />
            <div className="philo-divider"><span /><i>◆</i><span /></div>
            <span className="philo-kicker">Philosophy</span>
            <p className="philo-sub">― 経営理念 ―</p>
            <p className="philo-creed">
              溶接・金属加工を通じて<br />
              関わるすべての方との<br />
              <span className="hl">繋がり</span>を大切にし<br />
              <span className="hl">感謝</span>の心を忘れず<br />
              <span className="hl">笑顔</span>を生み出す存在へ
            </p>
          </Reveal>
        </div>
      </section>

      {/* COMPANY */}
      <section id="company" className="bg-2">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">Company</span>
            <h2>会社概要</h2>
          </Reveal>
          <Reveal className="company-grid">
            <table className="profile">
              <tbody>
                <tr><th>屋号・会社名</th><td>{site.name}（{site.nameJa}）</td></tr>
                <tr><th>代表者</th><td>{site.company.rep}</td></tr>
                <tr><th>設立</th><td>{site.company.founded}</td></tr>
                <tr><th>事業内容</th><td>{site.company.business}</td></tr>
                <tr><th>対応素材</th><td>{site.company.materials}</td></tr>
                <tr><th>所在地</th><td>〒{site.address.zip}<br />{site.address.line}</td></tr>
                <tr><th>電話</th><td>{site.contact.tel}（担当：{site.contact.person}）</td></tr>
                <tr><th>メール</th><td>{site.contact.email}</td></tr>
                <tr><th>営業時間</th><td>{site.contact.hours}</td></tr>
                <tr><th>対応エリア</th><td>{site.company.area}</td></tr>
              </tbody>
            </table>
            <div className="map-box">
              <iframe
                title="Heroes Worker 所在地"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">Contact</span>
            <h2>お問い合わせ・お見積もり</h2>
            <p>下記フォーム、またはお電話・メールにてお気軽にご連絡ください。</p>
          </Reveal>
          <Reveal className="contact-grid">
            <ContactForm />
            <div className="contact-info">
              <h3>お問い合わせ先</h3>
              <div className="info-row">
                <span className="ic">📞</span>
                <div>
                  <div className="l">お電話（担当：{site.contact.person}）</div>
                  <div className="v">
                    <a href={site.contact.telHref}>{site.contact.tel}</a>
                  </div>
                  <div className="l">受付時間 {site.contact.hours}</div>
                </div>
              </div>
              <div className="info-row">
                <span className="ic">✉️</span>
                <div>
                  <div className="l">メール</div>
                  <div className="v">
                    <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                  </div>
                </div>
              </div>
              <div className="info-row">
                <span className="ic">📍</span>
                <div>
                  <div className="l">所在地</div>
                  <div className="v">〒{site.address.zip}<br />{site.address.line}</div>
                </div>
              </div>
              <div className="info-row">
                <span className="ic">📷</span>
                <div>
                  <div className="l">Instagram</div>
                  <div className="v">
                    <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                      {site.social.instagramHandle}
                    </a>
                  </div>
                  <div className="l">施工事例を更新中</div>
                </div>
              </div>
              <a
                className="qr-card-contact"
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/instagram-qr.svg" alt="Instagram QRコード（@heroes_worker）" />
                <span>QRコードから<br />Instagramをフォロー</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
