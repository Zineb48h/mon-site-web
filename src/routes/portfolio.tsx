import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site/SiteLayout";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { LogosMarquee } from "@/components/site/LogosMarquee";
import { getProjects } from "@/lib/notion.functions";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "Portfolio · Réalisations social media — STUDIO.SOCIAL" },
      {
        name: "description",
        content:
          "Sélection de réalisations clients : stratégie, contenu et community management pour marques créatives. Résultats concrets, créativité assumée.",
      },
      { property: "og:title", content: "Portfolio · STUDIO.SOCIAL" },
      {
        property: "og:description",
        content: "Réalisations et collaborations marquantes.",
      },
      { property: "og:url", content: "https://zinebrais.fr/portfolio" },
      { property: "og:image", content: "https://zinebrais.fr/og-image.jpg" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://zinebrais.fr/portfolio" }],
  }),
});

function PortfolioPage() {
  const fetchProjects = useServerFn(getProjects);
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchProjects(),
  });

  return (
    <SiteLayout>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            (Portfolio)
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tighter md:text-7xl">
            Mes <span className="font-serif italic text-primary">réalisations</span>.
          </h1>
          <p className="mt-8 mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Chaque projet est une rencontre. Voici quelques marques avec qui
            j'ai eu la chance de bosser ces derniers mois.
          </p>
        </div>
      </section>

      <LogosMarquee />

      {/* Desktop : iframe Notion intégrée */}
      <section className="hidden px-6 pb-16 md:block">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
          <iframe
            src="https://zineb-socialmediamanager.notion.site/ebd/25752149dfd180348155cdbb9cfbd6ff"
            title="Portfolio Notion"
            width="100%"
            className="block h-[1200px] w-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>

      {/* Mobile : galerie React depuis Notion (pas d'iframe) */}
      <section className="px-6 pb-16 md:hidden">
        <div className="mx-auto max-w-5xl">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Chargement...</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-muted-foreground">Aucun projet trouvé.</p>
          ) : (
            <div className="grid gap-6">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  to="/portfolio/$slug"
                  params={{ slug: p.slug }}
                  className="group block space-y-3 rounded-3xl border border-border bg-card p-5 transition-transform hover:-rotate-1"
                >
                  {p.cover && (
                    <div className="aspect-video overflow-hidden rounded-2xl bg-muted">
                      <img
                        src={p.cover}
                        alt={p.title}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {p.category && (
                      <span className="text-primary">{p.category}</span>
                    )}
                    {p.client && <span>{p.client}</span>}
                  </div>
                  <h2 className="font-display text-xl font-bold group-hover:text-primary">
                    {p.title}
                  </h2>
                  {p.excerpt && (
                    <p className="text-sm text-muted-foreground">{p.excerpt}</p>
                  )}
                  {p.metric && (
                    <span className="inline-block rounded-xl bg-accent px-3 py-1 font-display text-sm font-bold">
                      {p.metric}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-6 py-24 text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          (On travaille ensemble ?)
        </p>
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold md:text-6xl">
          Un projet{" "}
          <span className="font-serif italic text-primary">en tête ?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Appel découverte gratuit de 30 min, sans engagement.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="https://calendly.com/zineb-communication/appel-decouverte-30-minutes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 font-display text-lg font-bold text-primary-foreground transition-transform hover:-rotate-2"
          >
            Réserver mon appel →
          </a>
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-2xl border-2 border-border bg-card px-8 py-4 font-display text-lg font-bold transition-transform hover:rotate-1"
          >
            Voir les offres
          </Link>
        </div>
      </section>

      <NewsletterCTA />
    </SiteLayout>
  );
}
