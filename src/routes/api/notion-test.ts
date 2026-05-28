import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/api/notion-test")({
  server: {
    handlers: {
      GET: async () => {
        const key = process.env.NOTION_API_KEY;
        const dbId = process.env.NOTION_PORTFOLIO_DB_ID;

        if (!key) return new Response(JSON.stringify({ error: "NOTION_API_KEY manquante" }), { headers: { "Content-Type": "application/json" } });
        if (!dbId) return new Response(JSON.stringify({ error: "NOTION_PORTFOLIO_DB_ID manquante" }), { headers: { "Content-Type": "application/json" } });

        const meRes = await fetch("https://api.notion.com/v1/users/me", {
          headers: { Authorization: `Bearer ${key}`, "Notion-Version": "2022-06-28" },
        });
        const meData = await meRes.json();

        // Récupère les blocs de la page pour trouver la child_database
        const blocksRes = await fetch(`https://api.notion.com/v1/blocks/${dbId}/children?page_size=50`, {
          headers: { Authorization: `Bearer ${key}`, "Notion-Version": "2022-06-28" },
        });
        const blocksData = await blocksRes.json();
        const childDb = blocksData?.results?.find((b: any) => b.type === "child_database");
        const childDbId = childDb?.id;

        // Query la child_database si trouvée
        let items: any[] = [];
        if (childDbId) {
          const qRes = await fetch(`https://api.notion.com/v1/databases/${childDbId}/query`, {
            method: "POST",
            headers: { Authorization: `Bearer ${key}`, "Notion-Version": "2022-06-28", "Content-Type": "application/json" },
            body: JSON.stringify({ page_size: 2 }),
          });
          const qData = await qRes.json();
          items = qData?.results?.map((p: any) => ({
            id: p.id,
            cover: p.cover,
            properties_keys: Object.keys(p.properties || {}),
            first_prop: Object.values(p.properties || {})[0],
          })) || [];
        }

        return new Response(JSON.stringify({
          auth_ok: meData?.object === "user" ? "✅ token valide" : "❌ token invalide",
          child_database_id: childDbId || "❌ pas trouvé",
          blocks_types: blocksData?.results?.map((b: any) => b.type),
          items_sample: items,
        }, null, 2), { headers: { "Content-Type": "application/json" } });
      },
    },
  },
});
