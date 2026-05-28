/**
 * Notion API helpers (server-only).
 * Appelle directement api.notion.com — aucune dépendance Lovable.
 */

const NOTION_BASE = "https://api.notion.com";

function getEnv() {
  const notionKey = process.env.NOTION_API_KEY;
  if (!notionKey)
    throw new Error("NOTION_API_KEY manquante — ajouter la clé dans Vercel.");
  return { notionKey };
}

async function notionFetch(path: string, init: RequestInit = {}) {
  const { notionKey } = getEnv();
  const res = await fetch(`${NOTION_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${notionKey}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.json();
}

/** Plain text from a Notion rich text array. */
function plainText(rt: any[] | undefined): string {
  if (!Array.isArray(rt)) return "";
  return rt.map((t) => t?.plain_text ?? "").join("");
}

/** Get a property value safely by trying multiple possible names. */
function readProp(props: Record<string, any>, names: string[]): any {
  for (const n of names) {
    const found =
      props[n] ??
      props[n.toLowerCase()] ??
      props[n[0].toUpperCase() + n.slice(1).toLowerCase()];
    if (found) return found;
  }
  return null;
}

function readTitle(props: Record<string, any>): string {
  const titleProp = Object.values(props).find((p: any) => p?.type === "title") as any;
  return plainText(titleProp?.title);
}

function readRichText(props: Record<string, any>, names: string[]): string {
  const p = readProp(props, names);
  return plainText(p?.rich_text);
}

function readSelect(props: Record<string, any>, names: string[]): string {
  const p = readProp(props, names);
  return p?.select?.name ?? "";
}

function readDate(props: Record<string, any>, names: string[]): string {
  const p = readProp(props, names);
  return p?.date?.start ?? "";
}

function readCover(page: any): string {
  // Try page cover, then a "Cover"/"Image" file property.
  if (page?.cover?.external?.url) return page.cover.external.url;
  if (page?.cover?.file?.url) return page.cover.file.url;
  const props = page?.properties ?? {};
  const fileProp = readProp(props, ["Cover", "Image", "Couverture", "Visuel"]);
  const file = fileProp?.files?.[0];
  if (file?.external?.url) return file.external.url;
  if (file?.file?.url) return file.file.url;
  return "";
}

function toSlug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export interface ContentItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  client: string;
  date: string;
  cover: string;
  metric: string;
}

export interface ContentBlock {
  type: string;
  text?: string;
  level?: number;
  url?: string;
  caption?: string;
  items?: string[];
  ordered?: boolean;
  language?: string;
}

/** Find a database by title (case-insensitive, matches any of the candidate names). */
async function findDatabaseId(candidateTitles: string[]): Promise<string | null> {
  try {
    const data = await notionFetch(`/v1/search`, {
      method: "POST",
      body: JSON.stringify({
        filter: { value: "database", property: "object" },
        page_size: 50,
      }),
    });
    const wanted = candidateTitles.map((t) => t.toLowerCase());
    for (const db of data?.results ?? []) {
      const title = plainText(db?.title).toLowerCase();
      if (wanted.some((w) => title.includes(w))) return db.id as string;
    }
  } catch (e) {
    console.error("Notion findDatabaseId failed", e);
  }
  return null;
}

function mapPageToItem(page: any): ContentItem {
  const props = page?.properties ?? {};
  const title = readTitle(props);
  const explicitSlug = readRichText(props, ["Slug", "URL"]);
  return {
    id: page.id,
    slug: explicitSlug || toSlug(title) || page.id.replace(/-/g, "").slice(0, 12),
    title,
    excerpt: readRichText(props, ["Excerpt", "Résumé", "Resume", "Description", "Extrait"]),
    category: readSelect(props, ["Category", "Catégorie", "Categorie", "Type"]),
    client: readRichText(props, ["Client", "Marque"]),
    date: readDate(props, ["Date", "Published", "Publié", "Publie"]),
    cover: readCover(page),
    metric: readRichText(props, ["Metric", "Résultat", "Resultat", "KPI"]),
  };
}

async function queryDatabase(databaseId: string): Promise<ContentItem[]> {
  try {
    const data = await notionFetch(`/v1/databases/${databaseId}/query`, {
      method: "POST",
      body: JSON.stringify({
        page_size: 100,
        sorts: [{ timestamp: "created_time", direction: "descending" }],
      }),
    });
    const items: ContentItem[] = (data?.results ?? [])
      .map(mapPageToItem)
      .filter((i: ContentItem) => i.title);
    // Filter by Status=Published if a Status property exists
    const filtered = (data?.results ?? [])
      .filter((page: any) => {
        const status = readSelect(page?.properties ?? {}, ["Status", "Statut"]);
        return !status || status.toLowerCase().startsWith("publi");
      })
      .map(mapPageToItem)
      .filter((i: ContentItem) => i.title);
    return filtered.length ? filtered : items;
  } catch (e) {
    console.error("Notion queryDatabase failed", e);
    return [];
  }
}

async function getPageBlocks(pageId: string): Promise<ContentBlock[]> {
  try {
    const data = await notionFetch(`/v1/blocks/${pageId}/children?page_size=100`);
    const blocks: ContentBlock[] = [];
    for (const b of data?.results ?? []) {
      const type = b.type;
      const payload = b[type];
      switch (type) {
        case "paragraph":
          blocks.push({ type: "paragraph", text: plainText(payload?.rich_text) });
          break;
        case "heading_1":
          blocks.push({ type: "heading", level: 1, text: plainText(payload?.rich_text) });
          break;
        case "heading_2":
          blocks.push({ type: "heading", level: 2, text: plainText(payload?.rich_text) });
          break;
        case "heading_3":
          blocks.push({ type: "heading", level: 3, text: plainText(payload?.rich_text) });
          break;
        case "bulleted_list_item":
        case "numbered_list_item": {
          const ordered = type === "numbered_list_item";
          const last = blocks[blocks.length - 1];
          if (last && last.type === "list" && last.ordered === ordered) {
            last.items!.push(plainText(payload?.rich_text));
          } else {
            blocks.push({
              type: "list",
              ordered,
              items: [plainText(payload?.rich_text)],
            });
          }
          break;
        }
        case "quote":
          blocks.push({ type: "quote", text: plainText(payload?.rich_text) });
          break;
        case "callout":
          blocks.push({ type: "callout", text: plainText(payload?.rich_text) });
          break;
        case "divider":
          blocks.push({ type: "divider" });
          break;
        case "code":
          blocks.push({
            type: "code",
            text: plainText(payload?.rich_text),
            language: payload?.language ?? "",
          });
          break;
        case "image": {
          const url = payload?.external?.url ?? payload?.file?.url ?? "";
          blocks.push({
            type: "image",
            url,
            caption: plainText(payload?.caption),
          });
          break;
        }
        default:
          // Skip unsupported block types silently.
          break;
      }
    }
    return blocks;
  } catch (e) {
    console.error("Notion getPageBlocks failed", e);
    return [];
  }
}

export async function fetchProjects(): Promise<ContentItem[]> {
  // Priorité : variable d'env NOTION_PORTFOLIO_DB_ID (plus fiable que la recherche par nom)
  const envId = process.env.NOTION_PORTFOLIO_DB_ID;
  const id = envId || await findDatabaseId([
    "projet",
    "portfolio",
    "case stud",
    "réalisation",
    "realisation",
    "client",
  ]);
  if (!id) return [];
  return queryDatabase(id);
}

export async function fetchArticles(): Promise<ContentItem[]> {
  const id = await findDatabaseId([
    "article",
    "blog",
    "post",
    "journal",
  ]);
  if (!id) return [];
  return queryDatabase(id);
}

export async function fetchProjectBySlug(slug: string) {
  const items = await fetchProjects();
  const item = items.find((i) => i.slug === slug);
  if (!item) return null;
  const blocks = await getPageBlocks(item.id);
  return { item, blocks };
}

export async function fetchArticleBySlug(slug: string) {
  const items = await fetchArticles();
  const item = items.find((i) => i.slug === slug);
  if (!item) return null;
  const blocks = await getPageBlocks(item.id);
  return { item, blocks };
}
