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

  const pageId = process.env.NOTION_PORTFOLIO_DB_ID || "25752149dfd180348155cdbb9cfbd6ff";

  // Fetch la page portfolio complète — elle contient les 2 galeries
  const recordMap = await notion.getPage(pageId);

  const collectionKeys = Object.keys(recordMap.collection || {});
  console.log("[Portfolio] collections trouvées:", collectionKeys.length);

  const galleries: Array<{
    id: string;
    title: string;
    items: Array<{ id: string; title: string; cover: string }>;
  }> = [];

  for (const collectionId of collectionKeys) {
    const collection = (recordMap.collection[collectionId] as any)?.value;
    const collTitle = collection?.name?.[0]?.[0] || "Projets";

    const queryData = (recordMap.collection_query as any)?.[collectionId];
    if (!queryData) continue;

    const viewId = Object.keys(queryData)[0];
    const viewData = queryData[viewId] as any;
    const blockIds: string[] =
      viewData?.collection_group_results?.blockIds ||
      viewData?.blockIds || [];

    const items = blockIds
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

    if (items.length > 0) galleries.push({ id: collectionId, title: collTitle, items });
  }

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
