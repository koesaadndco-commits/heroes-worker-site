// サイト全体で使う会社情報。ここを書き換えれば全ページに反映されます。
export const site = {
  name: "Heroes Worker",
  nameJa: "ヒーローズワーカー",
  tagline: "その一手間に、職人の誇りを。",
  description:
    "Heroes Worker（ヒーローズワーカー）は、TIG・MIG・アーク溶接から金属加工・製缶まで対応する溶接のプロ集団。一品物から量産まで、確かな技術で「つくりたい」をかたちにします。",
  // 取得したドメインに合わせて書き換えてください（例: https://heroesworker.com）
  url: "https://example.com",
  contact: {
    person: "シミズ",
    tel: "090-7081-1130",
    telHref: "tel:09070811130",
    email: "hiroya11300602@gmail.com",
    hours: "平日 8:00〜18:00（土日応相談）",
  },
  address: {
    zip: "923-0004",
    line: "石川県小松市長崎町4丁目77",
    mapQuery: "石川県小松市長崎町4丁目77",
  },
  company: {
    rep: "代表　清水 寛也",
    founded: "20XX年X月", // 決まり次第
    business: "各種溶接、金属加工・製缶、出張溶接・修理、オーダーメイド製作",
    materials: "鉄（スチール）・ステンレス・アルミ ほか",
    area: "石川県全域・近県（出張溶接の可否はお問い合わせください）",
  },
};

export const nav = [
  { href: "/#services", label: "事業内容" },
  { href: "/#strengths", label: "強み" },
  { href: "/works", label: "施工事例" },
  { href: "/#flow", label: "ご依頼の流れ" },
  { href: "/#company", label: "会社概要" },
  { href: "/#contact", label: "お問い合わせ" },
];
