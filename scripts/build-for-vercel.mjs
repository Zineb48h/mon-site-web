/**
 * Post-build script : transforme la sortie Vite en Vercel Build Output API
 *
 *  dist/client/  -> .vercel/output/static/        (assets statiques)
 *  dist/server/  -> bundle Node.js serverless      (SSR — runtime nodejs20.x)
 *
 * On utilise Node.js (pas Edge) car TanStack Start dépend de
 * node:async_hooks / node:stream qui ne sont pas dispo en Edge runtime.
 * esbuild bundle tout (react, tanstack…) en un seul fichier CJS.
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const out = path.join(root, ".vercel", "output");
const funcDir = path.join(out, "functions", "render.func");

// ── 1. Nettoyer et créer la structure ──────────────────────────────────────
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "static"), { recursive: true });
fs.mkdirSync(funcDir, { recursive: true });

// ── 2. Assets statiques ────────────────────────────────────────────────────
copyDir(path.join(root, "dist", "client"), path.join(out, "static"));
console.log("✓ Assets statiques copiés");

// ── 3. Wrapper Node.js HTTP → Web Request API ─────────────────────────────
//  Vercel Node.js functions reçoivent (req, res) ; TanStack Start parle
//  Web Request API. On adapte et on bundle tout ensemble.
const wrapperPath = path.join(root, "dist", "server", "__vercel_node.cjs");
fs.writeFileSync(
  wrapperPath,
  `
"use strict";
const serverModule = require('./server.js');
const server = serverModule.default ?? serverModule;

module.exports = async function handler(req, res) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
    const url = new URL(req.url, \`\${protocol}://\${host}\`);

    const headers = new Headers();
    for (const [k, v] of Object.entries(req.headers)) {
      if (v == null) continue;
      if (Array.isArray(v)) v.forEach((val) => headers.append(k, val));
      else headers.set(k, v);
    }

    let body;
    if (req.method !== "GET" && req.method !== "HEAD") {
      body = await new Promise((resolve, reject) => {
        const chunks = [];
        req.on("data", (c) => chunks.push(c));
        req.on("end", () => resolve(Buffer.concat(chunks)));
        req.on("error", reject);
      });
    }

    const webReq = new Request(url.toString(), {
      method: req.method,
      headers,
      body: body && body.length > 0 ? body : undefined,
      duplex: "half",
    });

    const webRes = await server.fetch(webReq, {}, {});

    res.statusCode = webRes.status;
    for (const [k, v] of webRes.headers.entries()) {
      res.setHeader(k, v);
    }

    const buf = Buffer.from(await webRes.arrayBuffer());
    res.end(buf);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
};
`,
);

// ── 4. Bundle avec esbuild (Node.js, CommonJS) ────────────────────────────
const outFile = path.join(funcDir, "index.js");

execSync(
  [
    `"node_modules/.bin/esbuild"`,
    `"${wrapperPath}"`,
    `--bundle`,
    `--platform=node`,
    `--format=cjs`,
    `--target=node20`,
    `"--outfile=${outFile}"`,
    `--log-level=warning`,
  ].join(" "),
  { cwd: root, stdio: "inherit" },
);

fs.rmSync(wrapperPath, { force: true });
console.log("✓ Serverless Function Node.js bundlée");

// ── 5. Config de la fonction (Node.js runtime) ────────────────────────────
fs.writeFileSync(
  path.join(funcDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs20.x",
      handler: "index.js",
      launcherType: "Nodejs",
      shouldAddHelpers: false,
    },
    null,
    2,
  ),
);

// ── 6. Routes Vercel ──────────────────────────────────────────────────────
fs.writeFileSync(
  path.join(out, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        {
          src: "^/assets/(.*)$",
          headers: { "cache-control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        { handle: "filesystem" },
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
