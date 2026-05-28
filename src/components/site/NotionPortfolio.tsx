"use client";
import { lazy, Suspense } from "react";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";

const Collection = lazy(() =>
  import("react-notion-x/build/third-party/collection").then((m) => ({
    default: m.Collection,
  }))
);

interface Props {
  recordMap: any;
}

export function NotionPortfolio({ recordMap }: Props) {
  return (
    <div className="notion-portfolio">
      <NotionRenderer
        recordMap={recordMap}
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
  );
}
