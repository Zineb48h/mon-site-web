import { useState, useEffect, type FormEvent } from "react";

const KEY = "newsletter-popup-dismissed";

async function subscribeEmail(email: string): Promise<void> {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("subscribe failed");
}

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    // Si déjà fermé ou soumis (persisté entre sessions), ne jamais montrer
    if (localStorage.getItem(KEY)) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Vérifier aussi dans le handler, pas seulement au montage
      if (e.clientY <= 10 && !localStorage.getItem(KEY)) {
        setVisible(true);
      }
    };

    // Fallback : affiche après 60 secondes si l'utilisateur ne part pas
    const timer = setTimeout(() => {
      if (!localStorage.getItem(KEY)) setVisible(true);
    }, 60000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  function dismiss() {
    localStorage.setItem(KEY, "1");
    setVisible(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await subscribeEmail(email);
      setStatus("success");
      localStorage.setItem(KEY, "1");
      setTimeout(() => setVisible(false), 2500);
    } catch {
      setStatus("error");
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md animate-enter rounded-[2.5rem] bg-tint-peach border-2 border-accent p-8 text-center [box-shadow:6px_8px_0px_0px_#ff9d0a]">
        <button
          onClick={dismiss}
          aria-label="Fermer"
          className="absolute right-5 top-5 grid size-8 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>

        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Newsletter gratuite
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold leading-tight md:text-3xl">
          Tu veux de la{" "}
          <span className="font-serif italic text-primary">valeur gratuite</span> ?
        </h3>
        <p className="mx-auto mt-3 max-w-xs text-sm text-muted-foreground">
          Stratégie LinkedIn, idées de contenu, tendances social media — une fois par mois dans ta boîte mail.
        </p>

        {status === "success" ? (
          <p className="mt-6 font-display text-lg font-bold text-primary">
            Bienvenue dans Le Post-it ! À très vite 🎉
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              disabled={status === "sending"}
              className="rounded-2xl border border-input bg-background px-4 py-3 text-foreground outline-none focus:border-primary disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-2xl bg-primary px-6 py-3 font-display font-bold text-primary-foreground transition-transform hover:-rotate-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Envoi…" : "Je m'inscris"}
            </button>
            {status === "error" && (
              <p className="text-xs text-red-600">Erreur, réessaie.</p>
            )}
            <button
              type="button"
              onClick={dismiss}
              className="font-mono text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Non merci, je repars sans valeur
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
