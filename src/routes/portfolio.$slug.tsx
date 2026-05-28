import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { NotionBlocks } from "@/components/site/NotionBlocks";
import { getProject } from "@/lib/notion.functions";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: async ({ params }) => {
    const data = await getProject({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    const item = loaderData?.item;
    const title = item ? `${item.title} · Étude de cas — STUDIO.SOCIAL` : "Projet";
    const desc = item?.excerpt || "Étude de cas social media.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/portfolio/${params.slug}` },
        ...(item?.cover
          ? [
              { property: "og:image", content: item.cover },
              { name: "twitter:image", content: item.cover },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: `/portfolio/${params.slug}` }],
      scripts: item
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                name: item.title,
                description: item.excerpt,
                image: item.cover || undefined,
                dateCreated: item.date || undefined,
              }),
            },
          ]
        : [],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl font-bold">Projet introuvable</h1>
        <Link to="/portfolio" className="mt-6 inline-block underline">
          ← Tout le portfolio
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Erreur de chargement</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
});

function ProjectPage() {
  const { item, blocks } = Route.useLoaderData();

  return (
    <SiteLayout>
      <article className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/portfolio"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
          >
            ← Tout le portfolio
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {item.category && (
              <span className="rounded-full bg-primary px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary-foreground">
                {item.category}
              </span>
            )}
            {item.client && (
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Client · {item.client}
              </span>
            )}
          </div>
          <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-tighter md:text-7xl">
            {item.title}
          </h1>
          {item.excerpt && (
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">
              {item.excerpt}
            </p>
          )}
          {item.metric && (
            <div className="mt-8 inline-block rotate-[-2deg] rounded-2xl bg-accent px-6 py-3 font-display text-xl font-bold">
              {item.metric}
            </div>
          )}
        </div>

        {item.cover && (
          <div className="mx-auto mt-12 max-w-5xl">
            <img
              src={item.cover}
              alt={item.title}
              className="aspect-video w-full rounded-3xl object-cover shadow-xl"
            />
          </div>
        )}

        <div className="mx-auto mt-16 max-w-3xl">
          <NotionBlocks blocks={blocks} />
        </div>
      </article>
    </SiteLayout>
  );
}
