import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  fetchProjects,
  fetchArticles,
  fetchProjectBySlug,
  fetchArticleBySlug,
} from "./notion.server";
import { NotionAPI } from "notion-client";

export const getPortfolioPage = createServerFn({ method: "GET" }).handler(async () => {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage("25752149dfd180348155cdbb9cfbd6ff");
  return recordMap;
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
