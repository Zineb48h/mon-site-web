import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/site/SiteLayout";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import { getArticles } from "@/lib/notion.functions";

const TAGS = ["Tous", "LinkedIn", "Réseaux sociaux", "Acquisition", "Personal branding", "Mindset"];

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog · Conseils social media et stratégie — STUDIO.SOCIAL" },
      {
        name: "description",
        content:
          "Articles, conseils et tendances social media : stratégie, création de contenu, algorithmes Instagram et TikTok, community management.",
      },
      { property: "og:title", content: "Blog · STUDIO.SOCIAL" },
      {
        property: "og:description",
        content: "Conseils et tendances pour faire grandir ta marque sur les réseaux.",
      },
      { property: "og:url", content: "https://zinebrais.fr/blog" },
      { property: "og:image", content: "https://zinebrais.fr/og-image.jpg" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://zinebrais.fr/blog" }],
  }),
});

function BlogPage() {
  const fetchArticles = useServerFn(getArticles);
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetchArticles(),
  });

  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("Tous");

  const filtered = articles.filter((a) => {
    const matchesTag = activeTag === "Tous" || a.category === activeTag;
    const matchesSearch =
      search === "" ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.excerpt ?? "").toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <SiteLayout>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            (Blog)
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tighter md:text-7xl">
            Le carnet{" "}
            <span className="font-serif italic text-primary">social</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Tactiques, opinions et retours d'expérience sur l'univers social
            media. Pas de blabla, que des choses utiles.
          </p>
        </div>
      </section>

      <section className="px-6 pb-6">
        <div className="mx-auto max-w-5xl space-y-4">
          {/* Recherche */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un article..."
            className="w-full rounded-2xl border border-input bg-card px-5 py-3 text-foreground outline-none focus:border-primary"
          />
          {/* Filtres par tag */}
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest transition-all ${
                  activeTag === tag
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Chargement...</p>
          ) : filtered.length === 0 ? (
            articles.length === 0 ? <EmptyState /> : (
              <p className="text-center text-muted-foreground">Aucun article trouvé pour cette recherche.</p>
            )
          ) : (
            <div className="grid gap-10 md:grid-cols-2">
              {filtered.map((a) => (
                <Link
                  key={a.id}
                  to="/blog/$slug"
                  params={{ slug: a.slug }}
                  className="group block space-y-4 rounded-3xl border border-border bg-card p-6 transition-transform hover:-rotate-1"
                >
                  {a.cover && (
                    <div className="aspect-video overflow-hidden rounded-2xl bg-muted">
                      <img
                        src={a.cover}
                        alt={a.title}
                        loading="lazy"
                        className="size-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {a.category && (
                      <span className="text-primary">{a.category}</span>
                    )}
                    {a.date && (
                      <time dateTime={a.date}>
                        {new Date(a.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    )}
                  </div>
                  <h2 className="font-display text-2xl font-bold group-hover:text-primary">
                    {a.title}
                  </h2>
                  {a.excerpt && (
                    <p className="text-muted-foreground">{a.excerpt}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsletterCTA />

    </SiteLayout>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-2xl rounded-3xl border-2 border-dashed border-border bg-card p-10 text-center">
      <p className="font-display text-2xl font-bold">
        Les premiers articles arrivent bientôt.
      </p>
      <p className="mt-4 text-muted-foreground">
        Crée une base de données Notion appelée{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
          Blog
        </code>{" "}
        (ou "Articles") avec : <strong>Name</strong>, <strong>Slug</strong>,{" "}
        <strong>Excerpt</strong>, <strong>Category</strong>,{" "}
        <strong>Date</strong>, <strong>Status</strong>. Ajoute une couverture
        et partage-la avec l'intégration Lovable.
      </p>
    </div>
  );
}
