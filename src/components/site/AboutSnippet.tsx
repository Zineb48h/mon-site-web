import { Link } from "@tanstack/react-router";
import { FaLinkedin, FaInstagram } from "react-icons/fa6";
import photoDeboutSrc from "@/assets/zineb rais photo debout.png";


const SOCIALS = [
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/zinebrais-brandcontentmanager/",
    label: "LinkedIn",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/zr_socialmedia/",
    label: "Instagram",
  },
];

export function AboutSnippet() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
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
              Ghostwriter LinkedIn & Social Media Manager freelance, j'accompagne
              les indépendants, entrepreneurs et dirigeantes dans la gestion{" "}
              <strong className="text-foreground font-semibold">stratégique</strong>{" "}
              de leurs réseaux sociaux.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              LinkedIn, Instagram, TikTok avec un objectif clair : booster ta
              visibilité, renforcer ton positionnement et attirer{" "}
              <strong className="text-foreground font-semibold">
                les bonnes opportunités
              </strong>
              .
            </p>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Mon approche est globale : stratégie, contenu, personal branding,
              community management, tout est pensé pour faire{" "}
              <span className="font-serif italic text-primary">
                rayonner ton projet
              </span>{" "}
              là où ton audience se trouve.
            </p>

            {/* Liens réseaux sociaux */}
            <div className="mt-8 flex items-center gap-5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-2xl text-foreground/60 transition-colors hover:text-primary"
                >
                  <Icon />
                </a>
              ))}
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

          {/* Colonne droite — photo */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="animate-float [animation-delay:0.8s] rotate-[3deg]">
              <img
                src={photoDeboutSrc}
                alt="Zineb Rais — Ghostwriter LinkedIn & Social Media Manager"
                className="w-72 md:w-80 lg:w-96"
                style={{ clipPath: "inset(0% 0% 0% 0% round 2.5rem)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
