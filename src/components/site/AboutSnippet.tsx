import { Link } from "@tanstack/react-router";
import { FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa6";

const PILLARS = [
  {
    emoji: "🎯",
    label: "Stratégie",
    desc: "Chaque action est pensée pour ton objectif, pas pour remplir un planning.",
  },
  {
    emoji: "✍️",
    label: "Création de contenu",
    desc: "Des posts qui te ressemblent, qui engagent et qui convertissent.",
  },
  {
    emoji: "👤",
    label: "Personal branding",
    desc: "Ton image, ton positionnement, ta voix — cohérents partout.",
  },
  {
    emoji: "🤝",
    label: "Community management",
    desc: "Une communauté qui s'engage, pas juste des followers qui scrollent.",
  },
];

export function AboutSnippet() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Label */}
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          (03) qui suis-je
        </p>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
          {/* Colonne gauche — texte */}
          <div>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              Hello, moi c'est{" "}
              <span className="font-serif italic text-primary">Zineb</span>.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Social media manager freelance, j'accompagne les indépendants,
              entrepreneurs et dirigeant·es dans la gestion{" "}
              <strong className="text-foreground font-semibold">stratégique</strong>{" "}
              de leurs réseaux sociaux.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              LinkedIn, Instagram, TikTok — avec un objectif clair : booster ta
              visibilité, renforcer ton positionnement et attirer{" "}
              <strong className="text-foreground font-semibold">
                les bonnes opportunités
              </strong>
              .
            </p>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Mon approche est globale : stratégie, contenu, personal branding,
              community management — tout est pensé pour faire{" "}
              <span className="font-serif italic text-primary">
                rayonner ton projet
              </span>{" "}
              là où ton audience se trouve.
            </p>

            {/* Plateformes */}
            <div className="mt-8 flex items-center gap-4">
              <FaLinkedin className="text-2xl text-foreground/60 hover:text-primary transition-colors" />
              <FaInstagram className="text-2xl text-foreground/60 hover:text-primary transition-colors" />
              <FaTiktok className="text-2xl text-foreground/60 hover:text-primary transition-colors" />
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/a-propos"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-foreground bg-transparent px-7 py-3.5 font-display font-bold transition-colors hover:bg-foreground hover:text-card"
              >
                En savoir plus sur moi →
              </Link>
              <a
                href="https://calendly.com/zineb-communication/appel-decouverte-30-minutes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-7 py-3.5 font-display font-bold text-primary-foreground transition-transform hover:-rotate-1"
              >
                Réserver un appel gratuit
              </a>
            </div>
          </div>

          {/* Colonne droite — pilliers */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <div
                key={p.label}
                className="rounded-2xl border border-border bg-card p-5 transition-transform hover:-translate-y-1"
              >
                <span className="text-2xl">{p.emoji}</span>
                <p className="mt-3 font-display text-base font-bold">{p.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
