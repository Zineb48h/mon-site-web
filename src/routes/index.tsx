import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { TestimonialsCarousel } from "@/components/site/TestimonialsCarousel";
import { PortfolioCarousel } from "@/components/site/PortfolioCarousel";
import { LogosMarquee } from "@/components/site/LogosMarquee";
import photoProSrc from "@/assets/Photo pro zineb V2.png";
import statSrc from "@/assets/stat.png";
import kpi1Src from "@/assets/capture kpi 1.png";
import kpi2Src from "@/assets/capture kpi 2.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title:
          "Social Media Manager freelance · STUDIO.SOCIAL — Stratégie, contenu, community",
      },
      {
        name: "description",
        content:
          "Social media manager freelance pour marques créatives. Stratégie sociale, création de contenu (Reels, carrousels), community management. Découvre mes projets et collaborons.",
      },
      { property: "og:title", content: "STUDIO.SOCIAL — Social Media Manager créative" },
      {
        property: "og:description",
        content:
          "Stratégie sociale, contenu qui arrête le scroll et community management pour marques créatives.",
      },
      { property: "og:url", content: "https://zinebrais.fr/" },
      { property: "og:image", content: "https://zinebrais.fr/og-image.jpg" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://zinebrais.fr/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Zineb Rais",
          jobTitle: "Social Media Manager freelance",
          url: "https://zinebrais.fr",
          sameAs: ["https://www.linkedin.com/in/zinebrais-brandcontentmanager"],
          address: { "@type": "PostalAddress", addressLocality: "Toulouse", addressCountry: "FR" },
          knowsAbout: ["Social Media Management", "LinkedIn", "Brand Content", "Meta Ads", "Community Management"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Comment se passe le premier appel ?", acceptedAnswer: { "@type": "Answer", text: "C'est un appel découverte gratuit de 30 min. On parle de ton business, tes objectifs et tes blocages actuels. Si c'est un match, je te propose une offre adaptée à ta situation." } },
            { "@type": "Question", name: "Est-ce qu'on peut tester sur 1 mois ?", acceptedAnswer: { "@type": "Answer", text: "Les accompagnements mensuels sont sur 3 mois minimum. Par contre, les missions ponctuelles (optimisation profil, atelier, pack templates) sont sans engagement de durée." } },
            { "@type": "Question", name: "Tu travailles avec quel type de clients ?", acceptedAnswer: { "@type": "Answer", text: "Principalement des indépendants, créateurs et petites entreprises qui ont quelque chose à dire mais qui manquent de temps ou de méthode." } },
            { "@type": "Question", name: "Comment on crée le contenu ensemble ?", acceptedAnswer: { "@type": "Answer", text: "Au démarrage, tu remplis un questionnaire. Ensuite on est en contact régulier. Je gère tout le reste : idées, formats, visuels, planning et publication." } },
            { "@type": "Question", name: "Par où commencer ?", acceptedAnswer: { "@type": "Answer", text: "Réserve un appel découverte gratuit de 30 min sur Calendly. On fait le point ensemble et je t'oriente vers la formule la plus adaptée." } },
          ],
        }),
      },
    ],
  }),
});

const SERVICES = [
  {
    emoji: "🤝",
    title: "Accompagnement LinkedIn",
    desc: "Stratégie, création de contenu, optimisation et modération. Pour faire de LinkedIn ton meilleur outil d'acquisition.",
    bg: "bg-tint-lavender",
    rotate: "rotate-[-2deg]",
    border: "border-2 border-primary",
    shadow: "[box-shadow:5px_7px_0px_0px_#8f0002]",
    iconBg: "bg-primary/10",
    hash: "accompagnement-linkedin",
  },
  {
    emoji: "📱",
    title: "Gestion réseaux sociaux",
    desc: "Instagram, TikTok, Facebook. Une présence cohérente, active et engageante sur les plateformes qui comptent pour toi.",
    bg: "bg-tint-peach",
    rotate: "rotate-[1.5deg]",
    border: "border-2 border-accent",
    shadow: "[box-shadow:5px_7px_0px_0px_#ff9d0a]",
    iconBg: "bg-accent/20",
    hash: "gestion-reseaux-sociaux",
  },
  {
    emoji: "✨",
    title: "Optimisation profil LinkedIn",
    desc: "Bannière, bio, SEO, section Sélection. Un profil qui attire les bonnes opportunités, livré en 48h.",
    bg: "bg-tint-mint",
    rotate: "rotate-[-1deg]",
    border: "border-2 border-secondary",
    shadow: "[box-shadow:5px_7px_0px_0px_#023020]",
    iconBg: "bg-secondary/10",
    hash: "optimisation-profil-linkedin",
  },
] as const;

function Index() {
  // Scroll reveal pour les 3 cartes services (mobile uniquement)
  const reveal0 = useScrollReveal();
  const reveal1 = useScrollReveal();
  const reveal2 = useScrollReveal();
  const cardReveals = [reveal0, reveal1, reveal2];

  return (
    <SiteLayout>
      {/* Hero */}
      <header className="relative px-6 pb-24 pt-8 md:pt-12">
        <div className="relative mx-auto max-w-6xl">
          <div className="absolute -left-10 -top-10 hidden size-32 rounded-full bg-accent/30 blur-3xl md:block" />
          <div className="absolute right-1/4 top-1/3 hidden size-24 rounded-full bg-secondary/20 blur-3xl lg:block" />

          <div className="relative z-10 flex items-center justify-between gap-4">

            {/* Stats gauche */}
            <div className="hidden lg:flex w-64 xl:w-72 shrink-0 relative items-center">
              {/* KPI en arrière-plan, plus petit */}
              <div className="animate-float rotate-[-5deg] w-[55%] overflow-hidden rounded-3xl shadow-md outline outline-4 outline-card opacity-90 scale-[2] origin-left -translate-y-8">
                <img src={kpi1Src} alt="KPI clients" className="w-full h-auto object-cover" />
              </div>
              {/* Stat en avant, plus grand, superposé */}
              <div className="animate-float [animation-delay:1.5s] rotate-[4deg] w-[65%] overflow-hidden rounded-3xl shadow-xl outline outline-4 outline-card -ml-6 z-10 translate-y-20 scale-[1.65] origin-right">
                <img src={statSrc} alt="Résultats clients" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* Texte central */}
            <div className="flex-1 min-w-0">

              {/* Badge — centré sur tous les écrans */}
              <div className="text-center">
                <span className="mb-6 lg:-mt-24 lg:mb-14 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                  Social Media Manager · freelance
                </span>
              </div>

              {/* ── MOBILE : titre 3 lignes centré + photo à droite ── */}
              <div className="flex items-center gap-4 lg:hidden">
                <h1 className="flex-1 font-nimbus text-3xl sm:text-4xl leading-[1.1] tracking-tight text-center animate-enter">
                  <span className="block mb-0">BRAND</span>
                  <span className="block font-serif italic text-primary mb-2">Content</span>
                  <span className="block">MAKER.</span>
                </h1>
                {/* Photo ronde + badge +40 */}
                <div className="shrink-0 pt-1 flex flex-col items-center gap-2">
                  <div className="animate-float [animation-delay:1.5s] rotate-[3deg]">
                    <img
                      src={photoProSrc}
                      alt="Zineb Rais — Social Media Manager"
                      className="w-24 sm:w-28"
                      style={{ clipPath: "circle(50% at 50% 50%)" }}
                    />
                  </div>
                  <div className="rotate-[-1deg] flex items-center gap-1.5 rounded-xl border border-border bg-card px-2.5 py-1 font-mono text-[10px] shadow-sm whitespace-nowrap">
                    <span className="text-primary font-bold">+40</span> clients accompagnés
                  </div>
                </div>
              </div>

              {/* ── DESKTOP : titre original inchangé ── */}
              <h1 className="hidden lg:block font-nimbus text-center text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight animate-enter">
                <span className="whitespace-nowrap">BRAND <span className="font-serif italic text-primary">Content</span></span>
                <br />
                MAKER.
              </h1>

              {/* Sous-titre */}
              <p className="mx-auto mt-6 max-w-md text-center text-base text-muted-foreground md:text-lg animate-enter [animation-delay:200ms]">
                Je gère ta présence sur les réseaux.<br />
                <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-accent after:rounded-full pb-1">
                  Toi, tu gères ton business.
                </span>
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap justify-center gap-4 animate-enter [animation-delay:400ms]">
                <div className="flex flex-col items-center gap-2">
                  <Link
                    to="/contact"
                    className="rounded-2xl bg-primary px-8 py-4 font-display text-lg font-bold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg"
                  >
                    Lancer mon projet
                  </Link>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Appel découverte gratuit · 30 min
                  </span>
                </div>
                <div className="flex rotate-[1deg] items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 md:px-6 md:py-4 font-mono text-xs md:text-sm">
                  <span className="size-2 shrink-0 animate-pulse rounded-full bg-emerald-500" />
                  Dispo pour de nouvelles collaborations
                </div>
              </div>

              {/* Section mobile uniquement : stat screen + 250K + LinkedIn */}
              <div className="flex lg:hidden flex-col items-center mt-10 gap-4">
                <div className="animate-float [animation-delay:0.5s] rotate-[-2deg] w-56 sm:w-64 overflow-hidden rounded-2xl shadow-xl outline outline-4 outline-card">
                  <img src={statSrc} alt="Résultats clients" className="w-full h-auto object-cover" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 font-mono text-xs shadow-md whitespace-nowrap">
                  <span className="text-primary font-bold">+250K</span> impressions LinkedIn
                </div>
                <a
                  href="https://www.linkedin.com/in/zinebrais-brandcontentmanager"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl border-2 border-primary bg-card px-5 py-2.5 font-display text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  Suis-moi sur LinkedIn →
                </a>
              </div>

            </div>

            {/* Photo pro droite */}
            <div className="hidden lg:flex w-64 xl:w-72 shrink-0 justify-center -mt-16">
              <div className="relative">
                {/* Badge +40 clients */}
                <div className="absolute -bottom-2 -right-12 z-10 rotate-[-2deg] animate-float [animation-delay:0.5s] flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 font-mono text-xs shadow-md whitespace-nowrap">
                  <span className="text-primary font-bold">+40</span> clients accompagnés
                </div>

                {/* Photo */}
                <div className="animate-float [animation-delay:1.5s] rotate-[4deg]">
                  <img
                    src={photoProSrc}
                    alt="Zineb Rais — Social Media Manager"
                    className="w-full"
                    style={{ clipPath: "circle(50% at 50% 50%)" }}
                  />
                </div>

                {/* Badge +250K impressions */}
                <div className="absolute -bottom-14 -right-12 z-10 rotate-[2deg] animate-float [animation-delay:1s] flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2 font-mono text-xs shadow-md whitespace-nowrap">
                  <span className="text-primary font-bold">+250K</span> impressions LinkedIn
                </div>

                {/* Lien LinkedIn */}
                <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <a
                    href="https://www.linkedin.com/in/zinebrais-brandcontentmanager"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-2xl border-2 border-primary bg-card px-5 py-2.5 font-display text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    Suis-moi sur LinkedIn →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </header>

      {/* Marquee */}
      <section
        aria-hidden="true"
        className="overflow-hidden border-y border-border bg-card py-5"
      >
        <div className="animate-marquee flex w-max gap-12 font-display text-2xl font-bold whitespace-nowrap md:text-3xl">
          {Array.from({ length: 2 }).map((_, group) => (
            <div className="flex gap-12" key={group}>
              {[
                "Gestion LinkedIn",
                "✦",
                "Gestion Réseaux sociaux",
                "✦",
                "Ghostwriting",
                "✦",
                "Création de contenu",
                "✦",
                "Stratégie de contenu",
                "✦",
                "Brand content",
                "✦",
                "Community management",
                "✦",
                "Optimisation LinkedIn",
                "✦",
              ].map((w, i) => (
                <span
                  key={i}
                  className={i % 4 === 2 ? "italic text-primary font-serif" : ""}
                >
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-card px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-col-reverse items-start justify-between gap-4 md:flex-row md:items-end">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Mes <span className="font-serif italic text-primary">super-pouvoirs</span>
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              (01) services & expertise
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                ref={cardReveals[i].ref}
                className={`
                  transition-all duration-500 ease-out
                  md:opacity-100 md:translate-y-0 md:scale-100
                  ${cardReveals[i].visible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"}
                `}
              >
                <Link
                  to="/services"
                  hash={s.hash}
                  className={`${s.rotate} ${s.border} ${s.shadow} ${s.bg} group block rounded-[2.5rem] p-8 transition-all duration-300 hover:rotate-0 hover:-translate-y-2`}
                >
                  <div className={`mb-6 grid size-14 place-items-center rounded-2xl ${s.iconBg} text-2xl`}>
                    {s.emoji}
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-bold">{s.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{s.desc}</p>
                  <p className="mt-4 font-mono text-xs font-bold text-foreground/50 transition-colors group-hover:text-foreground">
                    Voir l'offre →
                  </p>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary"
            >
              Voir toutes les offres{" "}
              <span className="inline-block md:animate-none animate-bounce">→</span>
            </Link>
          </div>
        </div>
      </section>

      <LogosMarquee />

      <PortfolioCarousel />

      <TestimonialsCarousel />

      <FaqSection />

      <NewsletterCTA />
    </SiteLayout>
  );
}

const FAQ = [
  {
    q: "Comment se passe le premier appel ?",
    a: "C'est un appel découverte gratuit de 30 min. On parle de ton business, tes objectifs et tes blocages actuels. Si c'est un match, je te propose une offre adaptée à ta situation.",
  },
  {
    q: "Est-ce qu'on peut tester sur 1 mois ?",
    a: "Les accompagnements mensuels sont sur 3 mois minimum, c'est le temps nécessaire pour poser une vraie stratégie et voir des résultats concrets. Par contre, les missions ponctuelles (optimisation profil, atelier, pack templates) sont sans engagement de durée.",
  },
  {
    q: "Tu travailles avec quel type de clients ?",
    a: "Principalement des indépendants, créateurs et petites entreprises qui ont quelque chose à dire mais qui manquent de temps ou de méthode. Pas de secteur type : j'ai travaillé pour de la skincare coréenne, du bricolage, des agents vocaux IA, des agences ADS... La diversité, c'est ce que j'aime.",
  },
  {
    q: "Comment on crée le contenu ensemble ?",
    a: "Au démarrage, tu remplis un questionnaire pour que je comprenne ton univers. Ensuite on est en contact régulier pour que je sois au courant des actualités de ton activité. Je gère tout le reste : idées, formats, visuels, planning et publication.",
  },
  {
    q: "Par où commencer ?",
    a: "Réserve un appel découverte gratuit de 30 min. On fait le point ensemble et je t'oriente vers la formule la plus adaptée à ta situation.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            (FAQ)
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Questions{" "}
            <span className="font-serif italic text-primary">fréquentes</span>
          </h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-200 ${
                open === i ? "border-primary bg-tint-lavender" : "border-border bg-card"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-lg font-bold">{item.q}</span>
                <span className={`shrink-0 text-primary transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>
                  ✦
                </span>
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Hook scroll reveal — mobile uniquement (desktop : toujours visible)
function useScrollReveal(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Sur desktop, les cartes sont déjà visibles via md:opacity-100
    // L'observer tourne quand même pour les mobiles
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // déclenche une seule fois
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
