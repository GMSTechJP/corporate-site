# GitHub Pages 公開手順ガイド

このドキュメントは、`site/` ディレクトリを GitHub リポジトリ化して、独自ドメイン `gmsbiz.net` で GitHub Pages 公開するまでの手順をまとめたものです。

> **前提**: Cowork セッション内ではマウント側のファイル権限の都合で git 操作ができませんでした。**以下はすべてローカルのターミナル(macOS の Terminal や iTerm2 など)から実行してください**。
>
> サイトのソースコードは `site/` ディレクトリ単独でリポジトリとして完結する構成にしてあります（GitHub Actions の `.github/workflows/deploy.yml` もリポジトリルート前提に調整済み）。

---

## 0. 事前準備（必須）

Cowork セッション中に試しに `git init` した残骸（`.git/` ディレクトリ）が残っているため、最初にこれを削除します。

```bash
cd ~/cowork_projects/会社紹介HP/site
rm -rf .git
```

GitHub アカウントへ SSH または HTTPS で push できる状態にしておいてください。
- SSH 鍵未設定なら: <https://docs.github.com/ja/authentication/connecting-to-github-with-ssh>

---

## 1. ローカルでビルド確認（任意・推奨）

リモートに push する前に、ローカルでもう一度ビルドが通ることを確認しておくと安心です。

```bash
cd ~/cowork_projects/会社紹介HP/site
npm install        # 既に node_modules があってもOK
npm run build      # dist/ 配下に静的ファイルが出力される
npm run preview    # http://localhost:4321 で動作確認
```

---

## 2. ローカルで git 初期化＆初期コミット

```bash
cd ~/cowork_projects/会社紹介HP/site

git init -b main
git add -A

git commit -m "feat: initial commit for GMS-Tech corporate site

- Astro + Markdown ベースの静的サイト
- Cowork ルーティン運用前提のコンテンツ/レイアウト分離
- GitHub Pages 自動デプロイ対応 (.github/workflows/deploy.yml)
- 独自ドメイン gmsbiz.net 用の CNAME 配置
- ロゴ/favicon/SEO meta 設定済み"
```

---

## 3. GitHub にリポジトリを作成

ブラウザで <https://github.com/new> を開く。

| 項目 | 推奨値 |
|---|---|
| Repository name | `corporate-site`（任意。GMS-Tech のオーナーアカウント配下に置く） |
| Description | `合同会社GMS-Tech コーポレートサイト` |
| Visibility | **Public**（GitHub Pages を無料枠で使うなら必須） |
| Initialize this repository with | **何もチェックしない**（README/`.gitignore`/license は今回は不要、すでにローカルに用意済み） |

`Create repository` ボタンを押す。

---

## 4. ローカルから push

GitHub の作成完了画面に出るコマンドのうち、`…or push an existing repository from the command line` を使います（ユーザー名・リポジトリ名は適宜置き換え）。

```bash
cd ~/cowork_projects/会社紹介HP/site

# SSH の場合
git remote add origin git@github.com:<オーナー>/corporate-site.git

# HTTPS の場合（PAT またはブラウザ認証）
# git remote add origin https://github.com/<オーナー>/corporate-site.git

git push -u origin main
```

push が成功すると、GitHub のリポジトリページに全ファイルが現れます。

---

## 5. GitHub Pages の有効化

リポジトリページで `Settings` → 左サイドバー `Pages` を開く。

| 項目 | 設定値 |
|---|---|
| Build and deployment ▶ Source | **GitHub Actions** |

`Source` を `GitHub Actions` にすると、リポジトリに含まれている `.github/workflows/deploy.yml` が自動で実行されます。

リポジトリの `Actions` タブを開いて、`Deploy to GitHub Pages` ワークフローが走っていることを確認。緑の ✓ になれば、いったん **`https://<オーナー>.github.io/corporate-site/`** で仮公開されています（ただし `astro.config.mjs` で `site: "https://gmsbiz.net"` 固定なので一部リンクが本番URLを指している点には注意。ドメイン切り替え後に解消）。

---

## 6. カスタムドメインを設定

`Settings` → `Pages` の同じ画面で **Custom domain** に `gmsbiz.net` を入力 → **Save**。

- リポジトリのルートに `CNAME` ファイルが既に `gmsbiz.net` で存在しているため、設定は即時反映されます。
- DNS レコードがまだ Apex を GitHub に向けていないため、この段階では「DNS Check unsuccessful」と表示されますが OK です。次のステップで DNS を切り替えます。

---

## 7. DNS 切り替え（お名前.com）

> **重要**: メール用レコード（MX / SPF / DKIM / TXT `MS=…`）は**絶対に削除・変更しないこと**。

事前に DKIM レコードの存在を確認しておきます。ローカルターミナルから:

```bash
nslookup -type=CNAME selector1._domainkey.gmsbiz.net
nslookup -type=CNAME selector2._domainkey.gmsbiz.net
```

結果が CNAME レコードを返した場合は、その値をメモしておく（DNS変更画面で消さないため）。

### お名前.com で実施

1. お名前.com Navi にログイン
2. `ドメイン` → `gmsbiz.net` の DNS設定 → `DNSレコード設定`
3. 以下 **追加**：

| ホスト名 | TYPE | VALUE | TTL |
|---|---|---|---|
| (空欄＝Apex) | A | `185.199.108.153` | 3600 |
| (空欄＝Apex) | A | `185.199.109.153` | 3600 |
| (空欄＝Apex) | A | `185.199.110.153` | 3600 |
| (空欄＝Apex) | A | `185.199.111.153` | 3600 |
| (空欄＝Apex) | AAAA | `2606:50c0:8000::153` | 3600 |
| (空欄＝Apex) | AAAA | `2606:50c0:8001::153` | 3600 |
| (空欄＝Apex) | AAAA | `2606:50c0:8002::153` | 3600 |
| (空欄＝Apex) | AAAA | `2606:50c0:8003::153` | 3600 |

4. 既存の `www` の **CNAME** を変更：
   - 変更前: `custom-domain.amebaowndme.com`
   - 変更後: `<オーナー>.github.io.`（末尾ドット付き）

5. **絶対に触らないレコード**:
   - `MX` — `gmsbiz-net.mail.protection.outlook.com`
   - `TXT` (SPF) — `v=spf1 include:spf.protection.outlook.com -all`
   - `TXT` — `MS=ms93083323`
   - DKIM の CNAME（事前確認で存在していれば、そのまま残す）

6. DNS 設定を保存（伝播は数分〜数時間）

---

## 8. HTTPS の有効化

DNS 伝播後（`dig gmsbiz.net A` で `185.199.x.153` が返るようになる）、再度 GitHub の `Settings` → `Pages` を開き、**Enforce HTTPS** にチェックを入れる。

Let's Encrypt の証明書が自動発行され、`https://gmsbiz.net` および `https://www.gmsbiz.net`（→ Apex への 301 リダイレクト）が動作するようになります。

---

## 9. 動作確認

```bash
# Apex で 200 が返る
curl -I https://gmsbiz.net

# www は 301 で Apex にリダイレクト
curl -I https://www.gmsbiz.net

# DNS 伝播確認
dig gmsbiz.net A +short
dig www.gmsbiz.net CNAME +short
```

ブラウザで <https://gmsbiz.net> を開いて、サイトが表示されればデプロイ完了です。

---

## 10. 旧サイト停止（移行最終フェーズ）

新サイトの動作を数日〜1週間観察し、問題なければ Ameba Ownd の旧サイトを停止／削除します。

---

## トラブルシューティング

### Pages が 404 のまま
- `Settings` → `Pages` で `Source: GitHub Actions` になっているか確認
- `Actions` タブのワークフロー実行ログを確認（ビルドエラーがないか）
- `public/CNAME` の中身が `gmsbiz.net` のみで、改行・スペースが入っていないか

### DNS Check unsuccessful が消えない
- `dig gmsbiz.net A +short` で GitHub の IP（`185.199.x.153`）が返っているか確認
- TTL が長い場合は数時間待つ
- お名前.com 側で MX や SPF を間違えて消していないか確認（メール疎通確認も併せて）

### 証明書発行が失敗する
- DNS が完全に切り替わってから `Enforce HTTPS` を ON にする
- 一度 Custom domain を消して再度入力すると証明書発行が再実行される

### メールが届かなくなった
- 即座に `MX` / `SPF` / `MS=…` の TXT レコードを元に戻す
- DKIM の CNAME を消していた場合は復元

---

## 以降のメンテナンス

- お知らせ・事例の追加は `src/content/news/` または `src/content/works/` に Markdown を追加して push
- 詳細は `docs/cowork-routines.md` 参照
- `main` ブランチへ push すれば自動でビルド＆再デプロイされる
