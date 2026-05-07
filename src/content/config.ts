// コンテンツコレクションの定義
// Coworkルーティンが新規Markdownを生成する際のスキーマとして機能する
import { defineCollection, z } from "astro:content";

// お知らせ: ファイル名は YYYY-MM-DD-slug.md
const news = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(["news", "release", "event"]).default("news"),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// 実績・事例: ファイル名は slug.md
const works = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    industry: z.string().optional(),
    /** 導入先(匿名表記。例: 「神奈川県 J旅館さま」) */
    client: z.string().optional(),
    tech: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// 固定ページ(会社概要など、構造化された情報)
const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { news, works, pages };
