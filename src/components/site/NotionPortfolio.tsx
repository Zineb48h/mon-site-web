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
}

export function NotionPortfolio({ galleries }: Props) {
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
              components={{
                Collection: (props: any) => (
                  <Suspense fallback={null}>
                    <Collection {...props} />
                  </Suspense>
                ),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
