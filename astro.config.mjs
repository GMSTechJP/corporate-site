// @ts-check
import { defineConfig } from "astro/config";

// 仮公開時はリポジトリ名サブパスでアセットを配信するため base を一時的に有効化
// 環境変数 PROJECT_PAGES_PREVIEW=1 のときのみ base を付与する想定
// 独自ドメイン gmsbiz.net 切り替え後はこの環境変数を外す(またはこの行を削除)
const isProjectPagePreview = process.env.PROJECT_PAGES_PREVIEW === "1";

export default defineConfig({
  site: "https://gmsbiz.net",
  base: isProjectPagePreview ? "/corporate-site/" : "/",
  // 末尾スラッシュを統一(GitHub Pages の挙動に合わせる)
  trailingSlash: "ignore",
  build: {
    // すべてのページを <slug>/index.html として出力
    format: "directory",
  },
});
