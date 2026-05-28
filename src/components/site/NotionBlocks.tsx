import type { ContentBlock } from "@/lib/notion.server";

export function NotionBlocks({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks.length) {
    return (
      <p className="text-muted-foreground">
        Le contenu de cette page sera affiché ici dès qu'il sera publié dans Notion.
      </p>
    );
  }

  return (
    <div className="space-y-6 text-lg leading-relaxed">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "paragraph":
            return b.text ? (
              <p key={i} className="text-foreground/90">
                {b.text}
              </p>
            ) : null;
          case "heading":
            if (b.level === 1)
              return (
                <h2
                  key={i}
                  className="mt-12 font-display text-4xl font-bold tracking-tight"
                >
                  {b.text}
                </h2>
              );
            if (b.level === 2)
              return (
                <h3
                  key={i}
                  className="mt-10 font-display text-3xl font-bold tracking-tight"
                >
                  {b.text}
                </h3>
              );
            return (
              <h4
                key={i}
                className="mt-8 font-display text-2xl font-bold tracking-tight"
              >
                {b.text}
              </h4>
            );
          case "list":
            return b.ordered ? (
              <ol key={i} className="list-decimal space-y-2 pl-6 marker:text-primary">
                {b.items?.map((item, j) => <li key={j}>{item}</li>)}
              </ol>
            ) : (
              <ul key={i} className="list-disc space-y-2 pl-6 marker:text-primary">
                {b.items?.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-primary bg-accent/20 px-6 py-4 font-serif text-2xl italic"
              >
                {b.text}
              </blockquote>
            );
          case "callout":
            return (
              <div
                key={i}
                className="rounded-2xl border border-border bg-tint-peach px-6 py-4"
              >
                {b.text}
              </div>
            );
          case "divider":
            return (
              <hr key={i} className="my-10 border-t-2 border-dashed border-border" />
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-2xl bg-foreground p-6 font-mono text-sm text-background"
              >
                <code>{b.text}</code>
              </pre>
            );
          case "image":
            return b.url ? (
              <figure key={i} className="my-8">
                <img
                  src={b.url}
                  alt={b.caption ?? ""}
                  loading="lazy"
                  className="w-full rounded-3xl border border-border"
                />
                {b.caption && (
                  <figcaption className="mt-3 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            ) : null;
          default:
            return null;
        }
      })}
    </div>
  );
}
