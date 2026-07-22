// 施工事例のデータ。写真を追加するには image に public/ からのパスを設定します。
// 例: image: "/works/example.jpg"（public/works/example.jpg を置く）
export type WorkCategory = "welding" | "fab" | "order" | "repair";

export type Work = {
  title: string;
  category: WorkCategory;
  badge: string;
  desc: string;
  image?: string; // 未設定ならプレースホルダー表示
};

export const categories: { key: WorkCategory | "all"; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "welding", label: "溶接" },
  { key: "fab", label: "製缶・架台" },
  { key: "order", label: "オーダー製作" },
  { key: "repair", label: "補修・修理" },
];

export const works: Work[] = [
  { title: "ステンレス製架台の製作", category: "fab", badge: "製缶・架台", desc: "図面をもとに製作した架台。耐久性と美観を両立しました。" },
  { title: "ステンレスTIG溶接", category: "welding", badge: "溶接", desc: "薄板の精密溶接。歪みを抑えた美しいビードに仕上げました。" },
  { title: "アルミ溶接", category: "welding", badge: "溶接", desc: "難易度の高いアルミ材の溶接にも対応しています。" },
  { title: "オーダー什器・看板", category: "order", badge: "オーダー製作", desc: "店舗用のオリジナル什器を一品物で製作しました。" },
  { title: "鉄骨フレーム製作", category: "fab", badge: "製缶・架台", desc: "強度計算に基づいた頑丈なフレームを製作。" },
  { title: "設備の現場補修", category: "repair", badge: "補修・修理", desc: "出張対応での溶接補修。稼働を止めずに修理しました。" },
  { title: "インテリア金物", category: "order", badge: "オーダー製作", desc: "住宅用のオリジナルアイアン金物を製作しました。" },
  { title: "鉄製品の溶接", category: "welding", badge: "溶接", desc: "強度が求められる鉄製品をしっかり溶接しました。" },
  { title: "農機具の修理", category: "repair", badge: "補修・修理", desc: "壊れた農機具の溶接修理。コストを抑えて再生しました。" },
];
