// Playwright でビルド済みサイトのスクリーンショットを撮る検証スクリプト
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const targets = [
  { url: "/", file: "out/01-top.png", fullPage: true },
  { url: "/", file: "out/01-top-mobile.png", fullPage: true, mobile: true },
  { url: "/works/", file: "out/02-works.png", fullPage: true },
  { url: "/works/onsen-occupancy-detection/", file: "out/03-works-detail.png", fullPage: true },
  { url: "/news/", file: "out/04-news.png", fullPage: true },
  { url: "/404", file: "out/05-404.png", fullPage: true },
];

const baseURL = process.env.BASE_URL ?? "http://localhost:4173";

const browser = await chromium.launch();
try {
  for (const t of targets) {
    const ctx = await browser.newContext(
      t.mobile
        ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 }
        : { viewport: { width: 1280, height: 800 } }
    );
    const page = await ctx.newPage();
    const resp = await page.goto(baseURL + t.url, { waitUntil: "networkidle" });
    const status = resp?.status() ?? -1;
    mkdirSync(dirname(t.file), { recursive: true });
    await page.screenshot({ path: t.file, fullPage: t.fullPage });
    console.log(`[OK] ${t.url} (HTTP ${status}) -> ${t.file}`);
    await ctx.close();
  }
} finally {
  await browser.close();
}
