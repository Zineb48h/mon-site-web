import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { fetchProjects, fetchArticles } from "@/lib/notion.server";

// TODO: replace with your project URL once a name or custom domain is set.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/a-propos", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/portfolio", changefreq: "weekly", priority: "0.9" },
          { path: "/blog", changefreq: "weekly", priority: "0.9" },
          { path: "/contact", changefreq: "yearly", priority: "0.7" },
        ];

        let dynamicPaths: { path: string }[] = [];
        try {
          const [projects, articles] = await Promise.all([
            fetchProjects(),
            fetchArticles(),
          ]);
          dynamicPaths = [
            ...projects.map((p) => ({ path: `/portfolio/${p.slug}` })),
            ...articles.map((a) => ({ path: `/blog/${a.slug}` })),
          ];
        } catch (e) {
          console.error("sitemap dynamic fetch failed", e);
        }

        const all = [...staticPaths, ...dynamicPaths];
        const urls = all
          .map(
            (e) =>
              `  <url><loc>${BASE_URL}${e.path}</loc>${
                "changefreq" in e && e.changefreq
                  ? `<changefreq>${e.changefreq}</changefreq>`
                  : ""
              }${
                "priority" in e && e.priority
                  ? `<priority>${e.priority}</priority>`
                  : ""
              }</url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
