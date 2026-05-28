import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// ─── Configuration Brevo ─────────────────────────────────────────────────────
// 1. Crée un compte sur brevo.com (gratuit jusqu'à 300 emails/jour)
// 2. Va dans Account → SMTP & API → API Keys → Create API Key
// 3. Ajoute BREVO_API_KEY dans les variables d'environnement Vercel
// 4. Va dans Contacts → Lists → note l'ID de ta liste newsletter
// 5. Remplace BREVO_LIST_ID ci-dessous par cet ID (ex: 3)

const BREVO_LIST_ID = 12;

export const Route = createFileRoute("/api/subscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["BREVO_API_KEY"];
        if (!apiKey) {
          return new Response(
            JSON.stringify({ error: "Service non configuré" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }

        let email: string;
        try {
          const body = (await request.json()) as { email?: string };
          email = body.email?.trim() ?? "";
        } catch {
          return new Response(JSON.stringify({ error: "Données invalides" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return new Response(JSON.stringify({ error: "Email invalide" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const res = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
            },
            body: JSON.stringify({
              email,
              listIds: [BREVO_LIST_ID],
              updateEnabled: true, // ré-abonne si déjà existant
            }),
          });

          // 204 = already exists, 201 = created — les deux sont OK
          if (res.ok || res.status === 204) {
            return new Response(JSON.stringify({ success: true }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          const err = (await res.json()) as { message?: string };
          return new Response(
            JSON.stringify({ error: err.message ?? "Erreur Brevo" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        } catch {
          return new Response(
            JSON.stringify({ error: "Impossible de joindre le serveur" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
