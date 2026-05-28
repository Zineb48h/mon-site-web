import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  fetchProjects,
  fetchArticles,
  fetchProjectBySlug,
  fetchArticleBySlug,
  fetchPortfolioSections,
} from "./notion.server";

export const getPortfolioSections = createServerFn({ method: "GET" }).handler(async () => {
  return fetchPortfolioSections();
});

export const getGalleryRecordMaps = createServerFn({ method: "GET" }).handler(async () => {
  const { NotionAPI } = await import("notion-client");
  const notion = new NotionAPI();

  const key = process.env.NOTION_API_KEY!;
  const pageId = process.env.NOTION_PORTFOLIO_DB_ID || "25752149dfd180348155cdbb9cfbd6ff";

  // Récupère les IDs des bases via API officielle
  const blocksRes = await fetch(
    `https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`,
    { headers: { Authorization: `Bearer ${key}`, "Notion-Version": "2022-06-28" } }
  );
  const blocks = await blocksRes.json();
  const dbIds: string[] = (blocks?.results ?? [])
    .filter((b: any) => b.type === "child_database")
    .map((b: any) => (b.id as string).replace(/-/g, ""));

  // Fetch chaque galerie via API non-officielle (gère les images correctement)
  const galleries = await Promise.all(
    dbIds.map(async (id) => {
      const recordMap = await notion.getPage(id);
      const block = recordMap?.block?.[id]?.value as any;
      const title = block?.properties?.title?.[0]?.[0] || "Projets";
      return { id, title, recordMap };
    })
  );

  return galleries;
});

export const getProjects = createServerFn({ method: "GET" }).handler(async () => {
  return fetchProjects();
});

export const getArticles = createServerFn({ method: "GET" }).handler(async () => {
  return fetchArticles();
});

const slugSchema = z.object({ slug: z.string().min(1).max(200) });

export const getProject = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => slugSchema.parse(d))
  .handler(async ({ data }) => {
    return fetchProjectBySlug(data.slug);
  });

export const getArticle = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => slugSchema.parse(d))
  .handler(async ({ data }) => {
    return fetchArticleBySlug(data.slug);
  });
