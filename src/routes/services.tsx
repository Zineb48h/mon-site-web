import React, { useRef, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { FaLinkedin, FaInstagram, FaTiktok, FaMeta } from "react-icons/fa6";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      {
        title:
          "Services · Stratégie sociale, contenu, community management — STUDIO.SOCIAL",
      },
      {
        name: "description",
        content:
          "Offres de social media management : stratégie, création de contenu (Reels, carrousels, TikTok), community management, formations. Tarifs sur devis.",
      },
      { property: "og:title", content: "Services · STUDIO.SOCIAL" },
      {
        property: "og:description",
        content:
          "Trois formules pour faire passer ta marque au niveau supérieur sur les réseaux sociaux.",
      },
      { property: "og:url", content: "https://zinebrais.fr/services" },
      { property: "og:image", content: "https://zinebrais.fr/og-image.jpg" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://zinebrais.fr/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: [
            {
              "@type": "Service",
              name: "Accompagnement LinkedIn",
              description:
                "Audit, optimisation, stratégie de contenu, création visuelle et modération. Engagement 3 mois.",
            },
            {
              "@type": "Service",
              name: "Gestion réseaux sociaux",
              description:
                "Gestion complète d'une ou plusieurs plateformes : stratégie, créa, modération et reporting.",
            },
            {
              "@type": "Service",
              name: "Gestion des Ads Meta",
              description:
                "Création et gestion de campagnes Meta (Facebook & Instagram). Hors budget publicitaire.",
            },
          ],
        }),
      },
    ],
  }),
});

const OFFERS = [
  {
    tag: "Formule 01",
    title: "Accompagnement LinkedIn",
    price: "À partir de 900 € / mois",
    desc: "Un accompagnement complet pour faire de LinkedIn ton meilleur outil de visibilité et d'acquisition.",
    bullets: [
      "Audit complet du profil perso et de la page entreprise",
      "Optimisation des deux pages",
      "Création de la stratégie de contenu",
      "Création de contenu (idées, formats, planning)",
      "Création visuelle en cohérence avec ton identité",
      "Veille sectorielle hebdomadaire",
      "Suivi des KPI & reporting mensuel détaillé",
      "Modération des commentaires et DM",
    ],
    icons: [FaLinkedin],
    badge3mois: true,
    bg: "bg-tint-lavender",
    rotate: "rotate-[-1deg]",
    border: "border-2 border-primary",
    shadow: "[box-shadow:5px_7px_0px_0px_#8f0002]",
    highlight: true,
    calendlyUrl: "https://calendly.com/zineb-communication/appel-decouverte-30-minutes?a7=Accompagnement+LinkedIn",
  },
  {
    tag: "Formule 02",
    title: "Gestion réseaux sociaux",
    price: "À partir de 700 € / mois",
    desc: "Gestion complète de ta présence sur les réseaux. Pour une marque cohérente, active et engageante.",
    bullets: [
      "Stratégie de contenu adaptée à la plateforme",
      "Création de contenu (idées, formats, planning éditorial)",
      "Création visuelle en cohérence avec ton identité",
      "Veille sectorielle hebdomadaire",
      "Suivi des KPI & reporting mensuel détaillé",
      "Modération des commentaires et DM",
    ],
    icons: [FaInstagram, FaTiktok],
    badge3mois: true,
    bg: "bg-tint-peach",
    rotate: "rotate-[1deg]",
    border: "border-2 border-accent",
    shadow: "[box-shadow:5px_7px_0px_0px_#ff9d0a]",
    calendlyUrl: "https://calendly.com/zineb-communication/appel-decouverte-30-minutes?a7=Gestion+des+r%C3%A9seaux+sociaux",
  },
  {
    tag: "Formule 03",
    title: "Gestion des Ads Meta",
    price: "À partir de 500 € / mois",
    desc: "Je gère tout pour toi : de la stratégie jusqu'au lancement et à l'optimisation.",
    badgeHorsBudget: true,
    bullets: [
      "Création et gestion des campagnes Meta (Facebook & Instagram)",
      "Création des visuels et copywriting des annonces",
      "Définition et optimisation des audiences",
      "Optimisation continue des performances",
      "Suivi des KPI & reporting mensuel détaillé",
    ],
    icons: [FaMeta, FaInstagram],
    bg: "bg-tint-mint",
    rotate: "rotate-[-1deg]",
    border: "border-2 border-secondary",
    shadow: "[box-shadow:5px_7px_0px_0px_#023020]",
    calendlyUrl: "https://calendly.com/zineb-communication/appel-decouverte-30-minutes?a7=Gestion+Meta+ADS",
  },
] as Array<{
  tag: string;
  title: string;
  price: string;
  desc: string;
  bullets: string[];
  icons: React.ElementType[];
  bg: string;
  rotate: string;
  border: string;
  shadow: string;
  highlight?: boolean;
  badge3mois?: boolean;
  badgeHorsBudget?: boolean;
  calendlyUrl?: string;
}>;

const ADDONS = [
  {
    title: "Optimisation profil LinkedIn",
    price: "450 €",
    badge: "Livraison express",
    tagline: "Parfait pour transformer ton profil en outil de prospection et attirer des opportunités qualifiées.",
    bullets: [
      "Création ou refonte de ta bannière",
      "Réécriture du titre, de la bio et de l'expérience",
      "Optimisation SEO du profil",
      "Section Sélection + URL personnalisée retravaillées",
      "Livraison en 48h maximum",
      "Fichiers sources Figma inclus",
      "2 cycles d'aller-retour de modifications",
    ],
    bg: "bg-tint-lavender",
    rotate: "rotate-[-1deg]",
    border: "border-2 border-primary",
    shadow: "[box-shadow:5px_7px_0px_0px_#8f0002]",
    calendlyUrl: "https://calendly.com/zineb-communication/appel-decouverte-30-minutes?a7=Optimisation+Profil+LinkedIn",
  },
  {
    title: "Atelier LinkedIn",
    price: "500 €",
    badge: "Pour les autonomes",
    tagline: "Parfait pour celles et ceux qui veulent gérer leur LinkedIn eux-mêmes et enfin avoir de vrais résultats.",
    bullets: [
      "3h de coaching visio 100% personnalisé à ton business",
      "Stratégie de contenu, personal branding, acquisition",
      "Support PDF + plan d'action concret à appliquer",
      "1 mois de suivi questions/réponses post-atelier",
    ],
    bg: "bg-tint-mint",
    rotate: "rotate-[1deg]",
    border: "border-2 border-secondary",
    shadow: "[box-shadow:5px_7px_0px_0px_#023020]",
    calendlyUrl: "https://calendly.com/zineb-communication/appel-decouverte-30-minutes?a7=Atelier+LinkedIn",
  },
  {
    title: "Pack templates",
    price: "400 €",
    badge: "Gain de temps",
    tagline: "Parfait pour publier vite, bien et sans jamais sacrifier ta cohérence visuelle.",
    bullets: [
      "8 à 10 slides carrousel prêts à publier",
      "4 visuels statiques cohérents avec ton identité",
      "Harmonisation de ta charte graphique existante",
      "Fichiers sources Figma inclus",
      "2 cycles d'aller-retour de modifications",
    ],
    bg: "bg-tint-peach",
    rotate: "rotate-[-1deg]",
    border: "border-2 border-accent",
    shadow: "[box-shadow:5px_7px_0px_0px_#ff9d0a]",
    calendlyUrl: "https://calendly.com/zineb-communication/appel-decouverte-30-minutes",
  },
  {
    title: "Pack complet",
    price: "800 €",
    badge: "Tout-en-un",
    tagline: "Parfait pour démarrer LinkedIn sur de vraies bases solides, profil, contenu et identité visuelle alignés dès le premier jour.",
    bullets: [
      "Optimisation profil LinkedIn au complet",
      "8 à 10 slides carrousel prêts à publier",
      "4 visuels statiques cohérents avec ton identité",
      "Cohérence identité visuelle sur tout le profil",
      "Fichiers sources Figma inclus",
      "4 cycles d'aller-retour de modifications",
    ],
    bg: "bg-tint-lavender",
    rotate: "rotate-[1deg]",
    border: "border-2 border-primary",
    shadow: "[box-shadow:5px_7px_0px_0px_#8f0002]",
    calendlyUrl: "https://calendly.com/zineb-communication/appel-decouverte-30-minutes",
  },
] as Array<{
  title: string;
  price: string;
  badge: string;
  tagline: string;
  bullets: string[];
  bg: string;
  rotate: string;
  border: string;
  shadow: string;
  calendlyUrl?: string;
}>;

function ServicesPage() {
  // Scroll reveal — 3 formules + 4 add-ons (mobile uniquement)
  const or0 = useScrollReveal();
  const or1 = useScrollReveal();
  const or2 = useScrollReveal();
  const ar0 = useScrollReveal();
  const ar1 = useScrollReveal();
  const ar2 = useScrollReveal();
  const ar3 = useScrollReveal();
  const offerReveals = [or0, or1, or2];
  const addonReveals = [ar0, ar1, ar2, ar3];

  return (
    <SiteLayout>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            (Services & tarifs)
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tighter md:text-7xl">
            Trois formules,
            <br />
            <span className="font-serif italic text-primary">selon ton projet.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Chaque collaboration est sur-mesure. Voici les formats les plus
            demandés, on adapte ensemble selon ton contexte.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-10 md:gap-8 md:grid-cols-3">
          {OFFERS.map((o, i) => (
            <div
              key={o.title}
              ref={offerReveals[i].ref}
              className={`transition-all duration-500 ease-out md:opacity-100 md:translate-y-0 md:scale-100 ${offerReveals[i].visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
            >
              <article
                id={o.title.toLowerCase().replace(/\s+/g, "-").replace(/[éèê]/g, "e").replace(/[àâ]/g, "a")}
                className={`${o.bg} ${o.rotate} ${o.border} ${o.shadow} relative flex flex-col rounded-[2.5rem] p-8 transition-all duration-300 hover:rotate-0 hover:-translate-y-2`}
              >
                {o.highlight && (
                  <span className="absolute -top-3 right-6 rounded-full bg-foreground px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-card">
                    Le + demandé
                  </span>
                )}
                <div className="mb-4 flex gap-2">
                  {o.icons.map((Icon, idx) => (
                    <Icon key={idx} className="text-2xl text-foreground/70" />
                  ))}
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {o.tag}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold">{o.title}</h2>
                <p className="mt-3 font-display text-xl font-bold text-primary">
                  {o.price}
                </p>
                <ul className="mt-6 space-y-2">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm">
                      <span className="mt-0.5 text-primary">✦</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t border-border/40 pt-4 font-mono text-xs italic text-muted-foreground">
                  {o.desc}
                </p>
                {o.calendlyUrl && (
                  <a
                    href={o.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center rounded-2xl bg-foreground px-6 py-3 font-display text-sm font-bold text-card transition-transform hover:-rotate-1"
                  >
                    Réserver mon appel →
                  </a>
                )}
                {o.badge3mois && (
                  <div className="mt-4 flex justify-center">
                    <span className="rounded-full bg-foreground/10 border border-foreground/20 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest">
                      Engagement · 3 mois
                    </span>
                  </div>
                )}
                {o.badgeHorsBudget && (
                  <div className="mt-6 flex justify-center">
                    <span className="rounded-full bg-foreground px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-card">
                      Hors budget publicitaire
                    </span>
                  </div>
                )}
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              À la <span className="font-serif italic text-primary">carte</span>
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Add-ons & missions ponctuelles
            </p>
          </div>
          <div className="grid gap-8 md:gap-4 md:grid-cols-2 lg:grid-cols-4">
            {ADDONS.map((a, i) => (
              <div
                key={a.title}
                ref={addonReveals[i].ref}
                className={`transition-all duration-500 ease-out md:opacity-100 md:translate-y-0 md:scale-100 ${addonReveals[i].visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
              >
                <div
                  id={a.title.toLowerCase().replace(/\s+/g, "-").replace(/[éèê]/g, "e").replace(/[àâ]/g, "a")}
                  className={`${a.bg} ${a.rotate} ${a.border} ${a.shadow} relative flex flex-col rounded-[2.5rem] p-8 transition-all duration-300 hover:rotate-0 hover:-translate-y-2`}
                >
                  <span className="absolute -top-3 left-6 rounded-full bg-foreground px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-card">
                    {a.badge}
                  </span>
                  <h3 className="font-display text-xl font-bold">{a.title}</h3>
                  <p className="mt-3 font-display text-lg font-bold text-primary">{a.price}</p>
                  <ul className="mt-4 space-y-2">
                    {a.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm">
                        <span className="mt-0.5 text-primary">✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-border/40 pt-4 font-mono text-xs italic text-muted-foreground">
                    {a.tagline}
                  </p>
                  {a.calendlyUrl && (
                    <div className="mt-auto pt-8">
                      <a
                        href={a.calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center rounded-2xl bg-foreground px-6 py-3 font-display text-sm font-bold text-card transition-transform hover:-rotate-1"
                      >
                        Réserver mon appel →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center">
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold md:text-6xl">
          Pas sûr·e de quelle formule choisir ?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Un appel découverte gratuit de 30 min pour y voir clair, sans
          engagement.
        </p>
        <div className="mt-10">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 font-display text-lg font-bold text-primary-foreground transition-transform hover:-rotate-2"
          >
            Réserver mon appel
          </Link>
        </div>
      </section>

      <NewsletterCTA />
    </SiteLayout>
  );
}

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
