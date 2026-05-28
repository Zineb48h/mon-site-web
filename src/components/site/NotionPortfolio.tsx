interface GalleryItem {
  id: string;
  slug: string;
  title: string;
  cover: string;
  client?: string;
}

interface Gallery {
  title: string;
  items: GalleryItem[];
}

interface Props {
  galleries: Gallery[];
}

export function NotionPortfolio({ galleries }: Props) {
  return (
    <div className="space-y-12 px-6">
      {galleries.map((g, i) => (
        <div key={i}>
          <h2 className="mb-5 font-display text-2xl font-bold">{g.title}</h2>
          <div className="grid grid-cols-2 gap-3">
            {g.items.map((item) => (
              <a
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-card"
              >
                {item.cover ? (
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={item.cover}
                      alt={item.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-accent flex items-center justify-center p-3">
                    <span className="text-center font-mono text-xs uppercase tracking-widest text-muted-foreground leading-relaxed">
                      {item.title}
                    </span>
                  </div>
                )}
                <div className="p-3">
                  <p className="font-display text-sm font-bold leading-tight group-hover:text-primary line-clamp-2">
                    {item.title}
                  </p>
                  {item.client && (
                    <p className="mt-1 font-mono text-xs text-muted-foreground uppercase tracking-widest">
                      {item.client}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
