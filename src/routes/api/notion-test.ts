import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/notion-test")({
  GET: async () => {
    const key = process.env.NOTION_API_KEY;
    const dbId = process.env.NOTION_PORTFOLIO_DB_ID;

    if (!key) return Response.json({ error: "NOTION_API_KEY manquante" });
    if (!dbId) return Response.json({ error: "NOTION_PORTFOLIO_DB_ID manquante" });

    // Test 1 : vérifier que le token est valide
    const meRes = await fetch("https://api.notion.com/v1/users/me", {
      headers: {
        Authorization: `Bearer ${key}`,
        "Notion-Version": "2022-06-28",
      },
    });
    const meData = await meRes.json();

    // Test 2 : essayer de querier la base
    const dbRes = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page_size: 3 }),
    });
    const dbData = await dbRes.json();

    return Response.json({
      token_prefix: key.slice(0, 10) + "...",
      db_id: dbId,
      auth_status: meRes.status,
      auth_result: meData,
      db_status: dbRes.status,
      db_result: dbData,
    });
  },
});
