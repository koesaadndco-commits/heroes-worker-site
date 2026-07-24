import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `採用情報 | ${site.name}`,
  description:
    "Heroes Worker（ヒーローズワーカー）の採用情報。溶接・金属加工の仲間を募集しています。未経験者歓迎、手に職をつけたい方をお待ちしています。",
};

const values = [
  {
    ic: "🔥",
    title: "手に職をつけられる",
    desc: "溶接・金属加工の技術は一生モノ。未経験からでも、基礎から丁寧に指導し、一人前の職人へと育てます。",
  },
  {
    ic: "🤝",
    title: "小さな会社だからこそ",
    desc: "一人ひとりの裁量が大きく、幅広い仕事に挑戦できます。頑張りはしっかり評価。距離の近いチームです。",
  },
  {
    ic: "📈",
    title: "資格取得を応援",
    desc: "各種溶接資格などの取得を支援。スキルアップした分だけ、待遇にも反映していきます。",
  },
];

const wanted = [
  "ものづくり・溶接に興味がある方",
  "手に職をつけて長く働きたい方",
  "誠実に、丁寧に仕事へ取り組める方",
  "チームで協力しながら成長したい方",
];

// 全雇用形態に共通の情報
const common = [
  { th: "職種", td: "溶接・金属加工スタッフ" },
  { th: "仕事内容", td: "TIG・半自動・アーク溶接、金属加工・製缶、架台やオーダー品の製作、出張溶接・修理 など" },
  { th: "応募資格", td: "学歴不問・未経験者歓迎（要 普通自動車免許）。経験者・有資格者は優遇します。" },
  { th: "勤務地", td: "石川県小松市長崎町4丁目77（マイカー通勤可）" },
];

// 雇用形態別の募集内容（時間・日数・給与・待遇など）
// ※金額・時間は目安です。確定情報に差し替えてご利用ください。
const jobs = [
  {
    type: "正社員",
    tag: "長く腰を据えて",
    rows: [
      ["勤務時間", "8:00〜18:00（休憩含む／実働は応相談）"],
      ["勤務日数", "週5日（会社カレンダーによる）"],
      ["休日", "日曜・祝日ほか、年末年始・夏季休暇"],
      ["給与", "月給制／経験・能力を考慮のうえ当社規定により決定"],
      ["待遇", "昇給あり／各種手当／資格取得支援／作業着貸与"],
    ],
  },
  {
    type: "パート",
    tag: "家庭と両立",
    rows: [
      ["勤務時間", "応相談（短時間勤務OK）"],
      ["勤務日数", "週2〜5日（応相談／扶養内勤務も可）"],
      ["休日", "シフトによる"],
      ["給与", "時給制／当社規定により決定"],
      ["待遇", "昇給あり／資格取得支援／作業着貸与"],
    ],
  },
  {
    type: "アルバイト",
    tag: "まずは気軽に",
    rows: [
      ["勤務時間", "応相談（短時間・曜日限定OK）"],
      ["勤務日数", "週1日〜（応相談）"],
      ["休日", "シフトによる"],
      ["給与", "時給制／当社規定により決定"],
      ["待遇", "未経験歓迎／シフト柔軟／作業着貸与"],
    ],
  },
];

export default function Recruit() {
  return (
    <>
      <Header />

      <section className="page-hero">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">Recruit</span>
            <h2>採用情報</h2>
            <p>
              溶接・金属加工を通じて、一緒に「ものづくり」を楽しむ仲間を募集しています。
            </p>
          </Reveal>
        </div>
      </section>

      {/* MESSAGE */}
      <section className="recruit-message">
        <div className="wrap philo-inner">
          <Reveal>
            <span className="philo-kicker">Message</span>
            <p className="recruit-lead">
              未経験からでも、
              <br />
              <span className="hl">一人前の職人</span>へ。
            </p>
            <p className="recruit-text">
              Heroes Worker は、溶接・金属加工のプロ集団です。最初は誰もが未経験からのスタート。
              大切なのは、ものづくりが好きという気持ちと、真面目に取り組む姿勢です。
              先輩がマンツーマンで基礎から教え、資格取得もサポートします。
              あなたの「やってみたい」を、確かな技術と誇りに変えていきましょう。
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section id="recruit-values" className="bg-2">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">Why Join Us</span>
            <h2>ここで働く魅力</h2>
          </Reveal>
          <div className="cards">
            {values.map((v) => (
              <Reveal className="card" key={v.title}>
                <div className="ic">{v.ic}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WANTED */}
      <section>
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">We Want You</span>
            <h2>こんな方を歓迎します</h2>
          </Reveal>
          <Reveal className="wanted-list">
            {wanted.map((w) => (
              <div className="wanted-item" key={w}>
                <span className="wanted-check">✓</span>
                <span>{w}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* REQUIREMENTS */}
      <section id="requirements" className="bg-2">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="kicker">Requirements</span>
            <h2>募集要項</h2>
            <p>ご希望の働き方に合わせて、正社員・パート・アルバイトを募集しています。</p>
          </Reveal>

          {/* 雇用形態別 */}
          <div className="job-cards">
            {jobs.map((j) => (
              <Reveal className="job-card" key={j.type}>
                <div className="job-card-head">
                  <span className="job-tag">{j.tag}</span>
                  <h3>{j.type}</h3>
                </div>
                <dl className="job-spec">
                  {j.rows.map(([k, v]) => (
                    <div className="job-spec-row" key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>

          {/* 共通事項 */}
          <Reveal className="job-common">
            <h3>共通事項</h3>
            <table className="profile recruit-table">
              <tbody>
                {common.map((r) => (
                  <tr key={r.th}>
                    <th>{r.th}</th>
                    <td>{r.td}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="job-note">
              ※記載の勤務時間・給与などは目安です。詳細は面談にてご相談のうえ決定します。
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="wrap">
          <Reveal className="cta">
            <h2>まずは話を聞いてみませんか？</h2>
            <p>
              「見学だけ」「まず相談から」も大歓迎です。お電話またはお問い合わせフォームからお気軽にご連絡ください。
            </p>
            <div className="recruit-cta-actions">
              <Link href="/#contact" className="btn btn-white">
                応募・お問い合わせ →
              </Link>
              <a href={site.contact.telHref} className="btn btn-ghost-white">
                電話で相談 {site.contact.tel}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
