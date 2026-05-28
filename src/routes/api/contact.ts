import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// ─── Brevo Transactionnel ────────────────────────────────────────────────────
// Même clé API que pour la newsletter (BREVO_API_KEY).
// Le formulaire envoie un email à zinebrais4@gmail.com via Brevo.
// Brevo free plan = 300 emails/jour gratuits, aucune carte bancaire requise.
//
// ⚠️  Avant le déploiement, configure l'adresse expéditrice dans Brevo :
//    Account → Senders, Domains & Dedicated IPs → Add a Sender
//    Ajoute "contact@zinebrais.fr" (ou noreply@zinebrais.fr)
//    Si tu n'as pas encore de domaine vérifié, tu peux utiliser
//    un sender non vérifié en mode test.

const TO_EMAIL = "zinebrais4@gmail.com";
const TO_NAME = "Zineb Rais";
const FROM_EMAIL = "noreply@zinebrais.fr"; // ← à vérifier dans Brevo
const FROM_NAME = "Site Web — zinebrais.fr";

export const Route = createFileRoute("/api/contact")({
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

        let name: string,
          email: string,
          project: string,
          message: string;
        try {
          const body = (await request.json()) as {
            name?: string;
            email?: string;
            project?: string;
            message?: string;
          };
          name = body.name?.trim() ?? "";
          email = body.email?.trim() ?? "";
          project = body.project?.trim() ?? "";
          message = body.message?.trim() ?? "";
        } catch {
          return new Response(JSON.stringify({ error: "Données invalides" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (!name || !email || !message) {
          return new Response(JSON.stringify({ error: "Champs manquants" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const htmlContent = `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#FBF8F2;border-radius:12px;">
            <h2 style="color:#8f0002;margin-bottom:24px;">Nouveau message depuis zinebrais.fr</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#5a6b62;font-size:13px;width:120px;">Prénom</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#5a6b62;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#8f0002;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#5a6b62;font-size:13px;">Projet</td><td style="padding:8px 0;">${project || "—"}</td></tr>
            </table>
            <div style="margin-top:24px;padding:20px;background:#fff;border-radius:8px;border-left:4px solid #8f0002;">
              <p style="color:#5a6b62;font-size:13px;margin:0 0 8px;">Message</p>
              <p style="white-space:pre-wrap;margin:0;">${message}</p>
            </div>
            <p style="margin-top:24px;font-size:12px;color:#5a6b62;">Répondre directement à : <a href="mailto:${email}">${email}</a></p>
          </div>
        `;

        try {
          const res = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
            },
            body: JSON.stringify({
              sender: { name: FROM_NAME, email: FROM_EMAIL },
              to: [{ email: TO_EMAIL, name: TO_NAME }],
              replyTo: { email, name },
              subject: `Nouveau projet — ${name} · zinebrais.fr`,
              htmlContent,
            }),
          });

          if (res.ok) {
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
