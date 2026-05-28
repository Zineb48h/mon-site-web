import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { NotionBlocks } from "@/components/site/NotionBlocks";
import { getArticle } from "@/lib/notion.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const data = await getArticle({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    const item = loaderData?.item;
    const title = item ? `${item.title} — STUDIO.SOCIAL` : "Article";
    const desc = item?.excerpt || "Article du blog social media.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        ...(item?.cover
          ? [
              { property: "og:image", content: item.cover },
              { name: "twitter:image", content: item.cover },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: item
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: item.title,
                description: item.excerpt,
                image: item.cover || undefined,
                datePublished: item.date || undefined,
              }),
            },
          ]
        : [],
    };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl font-bold">Article introuvable</h1>
        <Link to="/blog" className="mt-6 inline-block underline">
          ← Retour au blog
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Erreur</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
});

function ArticlePage() {
  const { item, blocks } = Route.useLoaderData();

  return (
    <SiteLayout>
      <article className="px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
          >
            ← Retour au blog
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {item.category && (
              <span className="text-primary">{item.category}</span>
            )}
            {item.date && (
              <time dateTime={item.date}>
                {new Date(item.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1] tracking-tighter md:text-6xl">
            {item.title}
          </h1>
          {item.excerpt && (
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
              {item.excerpt}
            </p>
          )}
        </div>

        {item.cover && (
          <div className="mx-auto mt-10 max-w-4xl">
            <img
              src={item.cover}
              alt={item.title}
              className="aspect-video w-full rounded-3xl object-cover"
            />
          </div>
        )}

        <div className="mx-auto mt-12 max-w-3xl">
          <NotionBlocks blocks={blocks} />
        </div>
      </article>
    </SiteLayout>
  );
}
