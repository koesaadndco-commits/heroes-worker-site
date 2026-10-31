-- Heroes Worker 管理コンソール用テーブル
-- 既存Supabaseプロジェクトに追加（他プロダクトと分離するため hw_ 接頭辞）。
-- RLS を有効化し、ポリシーは作らない＝匿名/一般ユーザーからは不可視。
-- アプリは Service Role Key（サーバー側のみ）で読み書きし RLS をバイパスする。

-- 設定（key/value）: 募集状態(recruit) と サイト基本情報(site_overrides) を保持
create table if not exists public.hw_settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- お問い合わせ履歴
create table if not exists public.hw_inquiries (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  email      text,
  tel        text,
  message    text,
  created_at timestamptz not null default now()
);

create index if not exists hw_inquiries_created_at_idx
  on public.hw_inquiries (created_at desc);

alter table public.hw_settings  enable row level security;
alter table public.hw_inquiries enable row level security;
