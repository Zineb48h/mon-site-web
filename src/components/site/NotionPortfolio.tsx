"use client";
import { lazy, Suspense } from "react";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";

const Collection = lazy(() =>
  import("react-notion-x/build/third-party/collection").then((m) => ({
    default: m.Collection,
  }))
);

interface Gallery {
  id: string;
  title: string;
  recordMap: any;
}

interface Props {
  galleries: Gallery[];
  idToSlug: Record<string, string>;
}

export function NotionPortfolio({ galleries, idToSlug }: Props) {
  const mapPageUrl = (pageId: string) => {
    const clean = pageId.replace(/-/g, "");
    return `/portfolio/${clean}`;
  };

  return (
    <div className="space-y-12">
      {galleries.map((g) => (
        <div key={g.id}>
          <h2 className="mb-4 px-6 font-display text-2xl font-bold">{g.title}</h2>
          <div className="notion-portfolio">
            <NotionRenderer
              recordMap={g.recordMap}
              fullPage={false}
              darkMode={false}
              disableHeader
              mapPageUrl={mapPageUrl}
              components={{
                Collection: (props: any) => (
                  <Suspense fallback={null}>
                    <Collection {...props} />
                  </Suspense>
                ),
                Link: ({ href, children, ...props }: any) => (
                  <a href={href} {...props}>{children}</a>
                ),
                PageLink: ({ href, children, ...props }: any) => (
                  <a href={href} {...props}>{children}</a>
                ),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
