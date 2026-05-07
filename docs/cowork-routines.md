# Cowork ルーティン運用ガイド

このドキュメントは、本サイトの**コンテンツ更新を Cowork のルーティン機能から実施する**ための運用ガイドです。
ルーティンは `src/content/` 配下のファイルだけを触れば良いように設計されています。

## ルーティンが触ってよいディレクトリ

| ディレクトリ | 用途 |
|---|---|
| `src/content/news/` | お知らせ Markdown |
| `src/content/works/` | 事例 Markdown |
| `src/content/pages/` | 固定ページ Markdown（必要に応じて） |
| `public/` 配下の画像 | 投稿で使用する画像（`public/images/news/` など） |

## ルーティンが触ってはいけないディレクトリ

レイアウト・スタイル・ルーティングの変更はルーティン経由で行わないこと。
デザイン変更やページ構成の変更は、開発者（Claude Code 含む）が手動で行います。

| ディレクトリ | 理由 |
|---|---|
| `src/layouts/` | 共通レイアウト |
| `src/components/` | 共通コンポーネント |
| `src/pages/` | ルーティング |
| `src/styles/` | グローバルスタイル |
| `astro.config.mjs` `tsconfig.json` `package.json` | プロジェクト設定 |
| `.github/` | CI/CD 設定 |

## ファイル命名規則

| コレクション | ファイル名 | 例 |
|---|---|---|
| お知らせ | `YYYY-MM-DD-slug.md` | `2026-05-07-website-renewal.md` |
| 事例 | `slug.md` | `onsen-occupancy-detection.md` |
| 固定ページ | `slug.md` | `about.md` |

`slug` は半角英数とハイフンのみ使用すること（URL の一部になる）。

## フロントマター仕様

### お知らせ（news）

| キー | 必須 | 型 | 説明 |
|---|---|---|---|
| `title` | ◯ | string | タイトル |
| `date` | ◯ | date | 投稿日（`YYYY-MM-DD`） |
| `category` | – | `news` \| `release` \| `event` | デフォルト `news` |
| `description` | – | string | 一覧の補足説明 |
| `draft` | – | boolean | 下書きなら `true`（ビルドから除外） |

### 事例（works）

| キー | 必須 | 型 | 説明 |
|---|---|---|---|
| `title` | ◯ | string | タイトル |
| `date` | ◯ | date | 公開日 |
| `summary` | ◯ | string | 一覧で表示する要約 |
| `industry` | – | string | 業界タグ（例: `宿泊業`） |
| `client` | – | string | 導入先（匿名表記。例: `神奈川県 J旅館さま`） |
| `tech` | – | string[] | 使用技術タグ |
| `cover` | – | string | カバー画像のパス（任意） |
| `draft` | – | boolean | 下書きフラグ |

## 推奨フロー（PR ベース）

1. ルーティンが**新しいブランチ**を切る（例: `routine/news-2026-05-07-xxx`）
2. ルーティンが Markdown を追加または編集
3. ルーティンが PR を作成
4. 人間がプレビュー（GitHub Actions のビルドログを確認）
5. 問題なければ `main` へマージ → 自動デプロイ

## 簡易フロー（直 push、軽微な更新のみ）

お知らせの軽微な追加であれば、`main` へ直 push でも可とする。
ただし、ビルドエラーが起きた場合は本番がそのまま壊れることはない（デプロイ前にビルド失敗で止まる）。

## トラブルシューティング

### ビルドが失敗する

1. フロントマターが規定どおりか確認（特に必須フィールド）
2. 日付形式が `YYYY-MM-DD` か確認
3. ファイル名の slug に全角文字や特殊記号が含まれていないか確認

### サイトに反映されない

1. `draft: true` のままになっていないか確認
2. GitHub Actions のデプロイログを確認
3. ブラウザキャッシュをクリアして再表示
