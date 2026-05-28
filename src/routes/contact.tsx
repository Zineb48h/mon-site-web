import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact · STUDIO.SOCIAL — Discutons de ton projet" },
      {
        name: "description",
        content:
          "Envie de collaborer ? Parle-moi de ton projet, je réponds sous 48h. Disponible pour missions ponctuelles ou accompagnements long terme.",
      },
      { property: "og:title", content: "Contact · STUDIO.SOCIAL" },
      {
        property: "og:description",
        content: "Parle-moi de ton projet — réponse sous 48h.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const EMAIL = "zinebrais4@gmail.com";
const CALENDLY_URL =
  "https://calendly.com/zineb-communication/appel-decouverte-30-minutes";

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          project: data.get("project"),
          message: data.get("message"),
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <SiteLayout>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            (Contact)
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tighter md:text-7xl">
            Raconte-moi{" "}
            <span className="font-serif italic text-primary">ton projet</span>.
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Remplis le formulaire ou écris-moi en direct. Je réponds sous 48h
            ouvrées, parfois en moins (quand l'inspiration frappe).
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-5">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 space-y-5 rounded-3xl border border-border bg-card p-8 shadow-sm"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field name="name" label="Ton prénom" required />
              <Field name="email" label="Ton email" type="email" required />
            </div>
            <SelectField
              name="project"
              label="Type de projet"
              options={[
                "Accompagnement LinkedIn",
                "Gestion réseaux sociaux",
                "Gestion des Meta Ads",
                "Optimisation profil LinkedIn",
                "Atelier LinkedIn",
                "Pack templates",
                "Pack complet",
                "Juste dire bonjour",
              ]}
            />
            <TextareaField
              name="message"
              label="Parle-moi un peu de toi"
              placeholder="Marque, secteur, où tu en es, ce qui te bloque, ce dont tu rêves..."
              required
            />
            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className="w-full rounded-2xl bg-primary px-8 py-4 font-display text-lg font-bold text-primary-foreground transition-transform hover:-rotate-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Envoi en cours…" : status === "success" ? "Message envoyé ✓" : "Envoyer ma demande →"}
            </button>
            {status === "success" && (
              <p className="text-center text-sm text-green-700 font-medium">
                Merci ! Je te réponds sous 48h. 🙌
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-600">
                Une erreur s'est produite. Écris-moi directement à{" "}
                <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a>.
              </p>
            )}
          </form>

          {/* Aside */}
          <aside className="space-y-6 md:col-span-2">
            <div className="rotate-[-1deg] rounded-3xl border border-border bg-tint-peach p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Email direct
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-2 block font-display text-xl font-bold underline decoration-primary decoration-2 underline-offset-4"
              >
                {EMAIL}
              </a>
            </div>
            <div className="rotate-[1deg] rounded-3xl border border-border bg-tint-mint p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Rendez-vous direct
              </p>
              <p className="mt-2 font-display text-lg font-bold">
                Appel découverte · 30 min
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-block rounded-full bg-primary px-5 py-2 font-display text-sm font-bold text-primary-foreground"
              >
                Réserver un créneau →
              </a>
            </div>
            <div className="rounded-3xl border border-border bg-tint-sky p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Réseaux
              </p>
              <ul className="mt-3 space-y-2 font-display text-lg font-bold">
                <li>
                  <a
                    href="https://www.instagram.com/zr_socialmedia/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-primary"
                  >
                    → Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-primary"
                  >
                    → LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Calendly inline embed */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              (Prise de rendez-vous)
            </p>
            <h2 className="font-display text-3xl font-bold md:text-5xl">
              Réserve un{" "}
              <span className="font-serif italic text-primary">
                appel découverte
              </span>{" "}
              de 30 min.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Sans engagement. On parle de ton projet, de tes objectifs et on
              voit comment je peux t'aider.
            </p>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
            <iframe
              src={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=8f0002`}
              title="Réserver un appel découverte"
              className="block h-[600px] w-full md:h-[750px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </SiteLayout>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}

function TextareaField({
  name,
  label,
  placeholder,
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      <textarea
        name={name}
        rows={6}
        required={required}
        placeholder={placeholder}
        className="w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <select
        name={name}
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-primary"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
