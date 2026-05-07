# 合同会社GMS-Tech コーポレートサイト

合同会社GMS-Tech のコーポレートサイトのソースコードです。
Astro + Markdown で構築し、GitHub Pages（Apex ドメイン `gmsbiz.net`）にデプロイします。

## 前提

- Node.js 22 以上
- npm 10 以上

## セットアップ

```bash
npm install
```

## 開発

```bash
npm run dev
```

`http://localhost:4321` でローカルプレビューが立ち上がります。

## ビルド

```bash
npm run build
```

`dist/` に静的ファイルが出力されます。

## ローカルプレビュー

```bash
npm run preview
```

ビルド済みサイトを `http://localhost:4321` でプレビューできます。

## ディレクトリ構成

```
site/
├── public/                # 静的ファイル（そのまま配信）
│   ├── logo.png
│   ├── favicon.svg
│   ├── robots.txt
│   └── CNAME              # GitHub Pages 用のドメイン設定
├── src/
│   ├── content/           # ★ コンテンツ（ルーティンが触る場所）
│   │   ├── config.ts      # コレクションのスキーマ定義
│   │   ├── news/          # お知らせ（YYYY-MM-DD-slug.md）
│   │   ├── works/         # 導入事例（slug.md）
│   │   └── pages/         # 固定ページ（必要に応じて追加）
│   ├── layouts/           # 共通レイアウト（基本的に触らない）
│   ├── components/        # 共通コンポーネント（基本的に触らない）
│   ├── pages/             # ルーティング・各ページ（基本的に触らない）
│   └── styles/global.css  # グローバルスタイル（デザイン変更時のみ）
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## コンテンツ追加（Cowork ルーティン用）

### お知らせを追加する

`src/content/news/YYYY-MM-DD-slug.md` を作成。

```markdown
---
title: お知らせのタイトル
date: 2026-05-07
category: news        # news | release | event
description: 一覧で表示する短い説明（任意）
draft: false
---

ここから本文。Markdown で書く。
```

### 事例を追加する

`src/content/works/slug.md` を作成。

```markdown
---
title: 事例のタイトル
date: 2026-05-07
summary: 一覧で表示する短い要約（必須）
industry: 宿泊業       # 任意
tech:                  # 任意（配列）
  - Raspberry Pi
  - Node-RED
draft: false
---

ここから本文。
```

`draft: true` にすると、ビルドから除外されます。

## デプロイ

`main` ブランチへ push すると、GitHub Actions（`.github/workflows/deploy.yml`）が自動でビルドして GitHub Pages へデプロイします。

初回の GitHub リポジトリ化〜独自ドメイン公開までの**詳細な手順**は [`docs/deployment-guide.md`](docs/deployment-guide.md) を参照してください。

## ドメイン設定

- Apex ドメイン `https://gmsbiz.net` を正規 URL とする
- `www.gmsbiz.net` は GitHub Pages 側で Apex へ 301 リダイレクト
- DNS 設定の詳細はリポジトリルートの `company-introduction-handoff-to-cowork.md` を参照

## ルーティン運用での注意

- `src/content/` 配下のファイル追加・編集のみで完結する設計です
- レイアウトやスタイルの変更は `src/layouts/` `src/components/` `src/styles/` を編集
- ビルドエラーは GitHub Actions 上で検出されます
