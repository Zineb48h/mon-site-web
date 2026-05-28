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

  // Construit idToSlug directement depuis les recordMaps (fiable, même source)
  const toSlug = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);

  const idToSlug: Record<string, string> = {};
  for (const g of galleries) {
    for (const [blockId, blockData] of Object.entries(g.recordMap.block || {})) {
      const b = (blockData as any)?.value;
      if (b?.type === "page") {
        const titleArr = b?.properties?.title || [];
        const pageTitle = titleArr.map((t: any) => (Array.isArray(t) ? t[0] : t)).join("");
        const slug = toSlug(pageTitle);
        if (slug) idToSlug[blockId.replace(/-/g, "")] = slug;
      }
    }
  }

  // Extrait les items de chaque galerie depuis le recordMap
  function extractItems(recordMap: any) {
    const collectionId = Object.keys(recordMap.collection || {})[0];
    if (!collectionId) return [];
    const queryData = recordMap.collection_query?.[collectionId];
    if (!queryData) return [];
    const viewId = Object.keys(queryData)[0];
    const blockIds: string[] =
      queryData[viewId]?.collection_group_results?.blockIds ||
      queryData[viewId]?.blockIds || [];
    return blockIds.map((blockId: string) => {
      const block = recordMap.block?.[blockId]?.value;
      if (!block) return null;
      const titleArr = block?.properties?.title || [];
      const title = titleArr.map((t: any) => (Array.isArray(t) ? t[0] : t)).join("");
      let cover = block?.format?.page_cover || "";
      if (cover && cover.startsWith("/")) cover = `https://www.notion.so${cover}`;
      return { id: blockId.replace(/-/g, ""), title, cover };
    }).filter(Boolean).filter((i: any) => i.title);
  }

  const galleriesWithItems = galleries.map((g) => ({
    id: g.id,
    title: g.title,
    items: extractItems(g.recordMap),
  }));

  return galleriesWithItems;
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
