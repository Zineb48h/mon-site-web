import { useState, type FormEvent } from "react";

type Variant = "block" | "inline" | "compact";
type Status = "idle" | "sending" | "success" | "error";

const NEWSLETTER_NAME = "Le Post-it";
const NEWSLETTER_TAGLINE =
  "Les coulisses, les stratégies et les tendances social media — dans ta boîte mail.";

async function subscribeEmail(email: string): Promise<void> {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const data = (await res.json()) as { error?: string };
    throw new Error(data.error ?? "Erreur");
  }
}

export function NewsletterCTA({ variant = "block" }: { variant?: Variant }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      await subscribeEmail(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const btnLabel =
    status === "sending"
      ? "Envoi…"
      : status === "success"
        ? "C'est bon ✓"
        : "Je m'inscris";

  /* ── COMPACT ────────────────────────────────────────────────── */
  if (variant === "compact") {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-2 sm:flex-row"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          disabled={status === "sending" || status === "success"}
          className="flex-1 rounded-2xl border border-input bg-background px-4 py-3 text-foreground outline-none focus:border-primary disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "sending" || status === "success"}
          className="rounded-2xl bg-primary px-6 py-3 font-display font-bold text-primary-foreground transition-transform hover:-rotate-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {btnLabel}
        </button>
        {status === "error" && (
          <p className="text-xs text-red-600">
            Une erreur s'est produite, réessaie.
          </p>
        )}
      </form>
    );
  }

  /* ── INLINE ─────────────────────────────────────────────────── */
  if (variant === "inline") {
    return (
      <div className="rounded-3xl border border-border bg-tint-peach p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Newsletter — {NEWSLETTER_NAME}
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">
          {NEWSLETTER_TAGLINE}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            disabled={status === "sending" || status === "success"}
            className="flex-1 rounded-2xl border border-input bg-background px-4 py-3 text-foreground outline-none focus:border-primary disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
            className="rounded-2xl bg-primary px-6 py-3 font-display font-bold text-primary-foreground transition-transform hover:-rotate-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {btnLabel}
          </button>
        </form>
        {status === "success" && (
          <p className="mt-3 text-sm font-medium text-green-700">
            Bienvenue dans Le Post-it ! 🎉
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">
            Une erreur s'est produite, réessaie.
          </p>
        )}
      </div>
    );
  }

  /* ── BLOCK — Post-it style ───────────────────────────────────── */
  /*
   * Visual anatomy:
   *   [  punaise  ]        ← absolute, sits above the post-it
   *   [──────────]         ← adhesive strip (accent orange)
   *   │          ╲         ← clip-path cuts the bottom-right corner
   *   │  content  │
   *   │           ╲
   *   └────────────         ← fold triangle fills the cut corner
   */
  return (
    <section className="overflow-visible px-6 py-24">
      <div className="mx-auto max-w-lg">
        {/*
         * Outer rotated wrapper — drop-shadow applies to the whole
         * combined shape (body + fold triangle as one silhouette).
         * pt-10 makes room for the pin sticking above.
         */}
        <div
          className="-rotate-[1.5deg] pt-10 transition-transform duration-500 hover:-rotate-[0.3deg]"
          style={{
            filter:
              "drop-shadow(4px 10px 24px rgba(0,0,0,0.2)) drop-shadow(0px 2px 6px rgba(0,0,0,0.08))",
          }}
        >
          {/* ── Punaise / thumbtack ─────────────────────────────── */}
          <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2">
            {/* Pin head — shiny dome */}
            <div
              className="relative mx-auto size-9 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 38% 35%, #c84040, #7a0001 70%)",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.2), inset 0 1px 3px rgba(255,255,255,0.25)",
              }}
            >
              {/* Specular highlight */}
              <div className="absolute left-2.5 top-2 h-2 w-3 rounded-full bg-white/30" />
            </div>
            {/* Needle */}
            <div
              className="mx-auto w-[5px] rounded-b-full"
              style={{
                height: "14px",
                background:
                  "linear-gradient(to right, #9a8870, #ddd0b8, #9a8870)",
              }}
            />
          </div>

          {/* ── Adhesive strip ──────────────────────────────────── */}
          <div
            className="h-5 rounded-t-[3px]"
            style={{ background: "#ff9d0a" }}
          />

          {/* ── Post-it body ────────────────────────────────────── */}
          {/*
           * HOW THE FOLD WORKS:
           *
           * [wrapper]  background = back-of-paper color (#b8901a)
           *   [front]  background = peach + clip-path cuts bottom-right corner
           *              → the wrapper's color shows THROUGH the cut = the fold
           *   [shadow] thin rotated div along the diagonal = 3-D crease line
           * [/wrapper]
           *
           * The drop-shadow filter (on the outer rotate div) sees the wrapper
           * rectangle as one solid shape → correct shadow around the whole note.
           */}

          <div
            className="px-8 pb-14 pt-8 text-center"
            style={{
              background: "#fff4de",
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(180,130,40,0.1) 27px, rgba(180,130,40,0.1) 28px)",
              borderRadius: "0 0 4px 4px",
            }}
          >
              <p className="font-mono text-xs uppercase tracking-widest text-[#8a6a00]">
                Newsletter gratuite
              </p>

              <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tighter text-foreground md:text-5xl">
                Le{" "}
                <span className="font-serif italic text-primary">Post</span>
                -it.
              </h2>

              <p className="mx-auto mt-5 max-w-sm text-[#3a2800]">
                De la valeur gratuite, une fois par mois dans ta boîte mail.
                Stratégie, contenu, coulisses et tendances social media.
              </p>

              <div className="mx-auto mt-5 flex flex-wrap justify-center gap-2">
                {[
                  "✦ Stratégie LinkedIn",
                  "✦ Idées de contenu",
                  "✦ Tendances social media",
                  "✦ Outils & ressources",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgba(0,0,0,0.1)] bg-white/50 px-4 py-1.5 font-mono text-xs text-[#5a3a00]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  disabled={status === "sending" || status === "success"}
                  className="flex-1 rounded-2xl border border-[rgba(0,0,0,0.12)] bg-white/70 px-4 py-3 text-foreground outline-none focus:border-primary disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className="rounded-2xl bg-primary px-6 py-3 font-display font-bold text-primary-foreground transition-transform hover:-rotate-1 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {btnLabel}
                </button>
              </form>

              {status === "success" && (
                <p className="mt-4 text-sm font-medium text-green-800">
                  Bienvenue dans Le Post-it ! Je t'envoie le prochain numéro
                  dès qu'il sort. 🎉
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-sm text-red-700">
                  Une erreur s'est produite. Réessaie ou contact-moi
                  directement.
                </p>
              )}

              <p className="mt-5 font-mono text-xs uppercase tracking-widest text-[#8a6a00]">
                1 email / mois · Désinscription en 1 clic
              </p>
            </div>

        </div>
      </div>
    </section>
  );
}
