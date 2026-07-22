# Heroes Worker サイト（Next.js）

溶接・金属加工会社「Heroes Worker（ヒーローズワーカー）」のコーポレートサイトです。
Next.js（App Router / TypeScript）製。Vercel へのデプロイを想定しています。

## 開発
 
```bash
npm install
npm run dev      # http://localhost:3000
```

## ビルド

```bash
npm run build
npm start
```

## 構成

```
app/
  layout.tsx        全体レイアウト・フォント・メタ情報
  page.tsx          トップページ
  works/page.tsx    施工事例ページ
  api/contact/route.ts  お問い合わせ送信API
  globals.css       スタイル
components/          Header / Footer / Hero用Sparks / Reveal / ContactForm / WorksGallery
lib/
  site.ts           会社情報（連絡先・住所など）← ここを編集すれば全ページ反映
  works.ts          施工事例データ（写真の追加もここ）
public/logo.png     ロゴ
```

## 内容の編集ポイント

- **会社情報・連絡先**: `lib/site.ts`
- **施工事例**: `lib/works.ts`（写真は `public/works/` に置き、`image: "/works/xxx.jpg"` を設定）
- **ドメイン**: `lib/site.ts` の `url` を取得したドメインに変更

## お問い合わせフォームのメール送信（Vercel）

メール送信には [Resend](https://resend.com) を使用します。Vercel の
Project Settings → Environment Variables に以下を登録してください（`.env.example` 参照）。

| 変数 | 内容 |
|------|------|
| `RESEND_API_KEY` | Resend の APIキー |
| `CONTACT_TO` | 受信先メール（例: hiroya11300602@gmail.com） |
| `CONTACT_FROM` | 送信元（認証済みドメインのアドレス。未設定時は `onboarding@resend.dev`） |

`RESEND_API_KEY` が未設定の間は、フォームは送信成功扱いになりますがメールは飛びません
（サーバーログに内容が記録されます）。キーを登録すると自動的に実送信されます。

## Vercel デプロイ手順（概要）

1. このプロジェクトを GitHub リポジトリに push
2. [Vercel](https://vercel.com) で「New Project」→ 該当リポジトリを Import
3. Framework は自動検出（Next.js）。そのまま Deploy
4. 独自ドメイン（.com）は Project → Settings → Domains で追加し、DNS を設定
5. お問い合わせを使う場合は上記の環境変数を登録
