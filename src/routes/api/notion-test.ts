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

        const dbRes = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Notion-Version": "2022-06-28", "Content-Type": "application/json" },
          body: JSON.stringify({ page_size: 3 }),
        });
        const dbData = await dbRes.json();

        return new Response(JSON.stringify({
          token_prefix: key.slice(0, 10) + "...",
          db_id: dbId,
          auth_status: meRes.status,
          auth_ok: meData?.object === "user" ? "✅ token valide" : "❌ token invalide",
          db_status: dbRes.status,
          db_result: dbData,
        }, null, 2), { headers: { "Content-Type": "application/json" } });
      },
    },
  },
});
