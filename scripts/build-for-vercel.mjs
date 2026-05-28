/**
 * Post-build script : transforme la sortie Vite en Vercel Build Output API
 *
 *  dist/client/  -> .vercel/output/static/       (assets statiques)
 *  dist/server/  -> .vercel/output/functions/render.func/  (Edge Function SSR)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const out = path.join(root, ".vercel", "output");

// ── 1. Nettoyer et créer la structure ──────────────────────────────────────
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "static"), { recursive: true });
fs.mkdirSync(path.join(out, "functions", "render.func"), { recursive: true });

// ── 2. Assets statiques ────────────────────────────────────────────────────
copyDir(path.join(root, "dist", "client"), path.join(out, "static"));
console.log("✓ Assets statiques copiés");

// ── 3. Fichiers serveur → Edge Function ───────────────────────────────────
copyDir(
  path.join(root, "dist", "server"),
  path.join(out, "functions", "render.func"),
);
console.log("✓ Bundle serveur copié");

// ── 4. Wrapper Edge Function ───────────────────────────────────────────────
fs.writeFileSync(
  path.join(out, "functions", "render.func", "index.js"),
  `import server from './server.js';
export default function handler(request) {
  return server.fetch(request, {}, {});
}
`,
);

// ── 5. Config de la fonction ───────────────────────────────────────────────
fs.writeFileSync(
  path.join(out, "functions", "render.func", ".vc-config.json"),
  JSON.stringify({ runtime: "edge", entrypoint: "index.js" }, null, 2),
);

// ── 6. Routes Vercel ──────────────────────────────────────────────────────
fs.writeFileSync(
  path.join(out, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        // Cache long pour les assets hachés
        {
          src: "^/assets/(.*)$",
          headers: { "cache-control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        // Sert les fichiers statiques s'ils existent
        { handle: "filesystem" },
        // Tout le reste → SSR Edge Function
        { src: "/(.*)", dest: "/render" },
      ],
    },
    null,
    2,
  ),
);

console.log("✓ Config Vercel générée");
console.log("✅ Build Vercel terminé → .vercel/output/");

// ── Utilitaire copie récursive ─────────────────────────────────────────────
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}
