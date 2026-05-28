import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  fetchProjects,
  fetchArticles,
  fetchProjectBySlug,
  fetchArticleBySlug,
  fetchPortfolioSections,
} from "./notion.server";

export const getPortfolioRecordMap = createServerFn({ method: "GET" }).handler(async () => {
  const { NotionAPI } = await import("notion-client");
  const notion = new NotionAPI();
  const pageId = process.env.NOTION_PORTFOLIO_DB_ID || "25752149dfd180348155cdbb9cfbd6ff";
  const recordMap = await notion.getPage(pageId);
  return recordMap;
});

export const getPortfolioSections = createServerFn({ method: "GET" }).handler(async () => {
  return fetchPortfolioSections();
});

export const getGalleryRecordMaps = createServerFn({ method: "GET" }).handler(async () => {
  const { NotionAPI } = await import("notion-client");
  const notion = new NotionAPI();

  const key = process.env.NOTION_API_KEY!;
  const pageId = process.env.NOTION_PORTFOLIO_DB_ID || "25752149dfd180348155cdbb9cfbd6ff";

  // Étape 1 : récupère les IDs des galeries via API officielle
  const blocksRes = await fetch(
    `https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`,
    { headers: { Authorization: `Bearer ${key}`, "Notion-Version": "2022-06-28" } }
  );
  const blocks = await blocksRes.json();
  const dbIds: string[] = (blocks?.results ?? [])
    .filter((b: any) => b.type === "child_database")
    .map((b: any) => (b.id as string).replace(/-/g, ""));

  console.log("[Portfolio] dbIds trouvés:", dbIds.length, dbIds);

  // Étape 2 : fetch chaque galerie par son ID via API non-officielle
  function extractItemsFromRecordMap(recordMap: any, dbId: string) {
    const collectionId = Object.keys(recordMap.collection || {})[0];
    if (!collectionId) { console.log("[Portfolio] pas de collection pour", dbId); return []; }

    const queryData = (recordMap.collection_query as any)?.[collectionId];
    if (!queryData) { console.log("[Portfolio] pas de collection_query pour", dbId); return []; }

    const viewId = Object.keys(queryData)[0];
    const viewData = queryData[viewId] as any;

    // Essaie tous les chemins possibles pour les blockIds
    const blockIds: string[] =
      viewData?.collection_group_results?.blockIds ||
      viewData?.blockIds ||
      viewData?.result?.blockIds ||
      [];

    console.log("[Portfolio] blockIds pour", dbId, ":", blockIds.length);

    return blockIds
      .map((blockId: string) => {
        const block = (recordMap.block as any)?.[blockId]?.value;
        if (!block) return null;
        const titleArr = block?.properties?.title || [];
        const title = titleArr.map((t: any) => (Array.isArray(t) ? t[0] : t)).join("");
        let cover = block?.format?.page_cover || "";
        if (cover && cover.startsWith("/")) cover = `https://www.notion.so${cover}`;
        return { id: blockId.replace(/-/g, ""), title, cover };
      })
      .filter(Boolean)
      .filter((i: any) => i.title) as Array<{ id: string; title: string; cover: string }>;
  }

  const galleries = await Promise.all(
    dbIds.map(async (id) => {
      const recordMap = await notion.getPage(id);
      const block = (recordMap?.block as any)?.[id]?.value;
      const collVal = Object.values(recordMap.collection || {})[0] as any;
      const title =
        collVal?.value?.name?.[0]?.[0] ||
        block?.properties?.title?.[0]?.[0] ||
        "Projets";
      const items = extractItemsFromRecordMap(recordMap, id);
      return { id, title, items };
    })
  );

  return galleries.filter((g) => g.items.length > 0);
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
