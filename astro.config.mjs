// @ts-check
import { defineConfig } from "astro/config";

// 本番デプロイ先(GitHub Pages の Apex ドメイン)
// プロジェクトページでは base を設定するが、Apex ドメイン運用のため base は不要
// site は SEO・サイトマップ生成・絶対URL用に必要
export default defineConfig({
  site: "https://gmsbiz.net",
  // 末尾スラッシュを統一(GitHub Pages の挙動に合わせる)
  trailingSlash: "ignore",
  build: {
    // すべてのページを <slug>/index.html として出力
    format: "directory",
  },
});
