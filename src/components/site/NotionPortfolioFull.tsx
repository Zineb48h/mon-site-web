"use client";

import { lazy, Suspense } from "react";
import { NotionRenderer } from "react-notion-x";
import type { ExtendedRecordMap } from "notion-types";
import "react-notion-x/src/styles.css";

// Lazy imports — these components are client-only (they use browser APIs)
const Collection = lazy(() =>
  import("react-notion-x/build/third-party/collection").then((m) => ({
    default: m.Collection,
  }))
);

const Modal = lazy(() =>
  import("react-notion-x/build/third-party/modal").then((m) => ({
    default: m.Modal,
  }))
);

function mapPageUrl(pageId: string): string {
  return `/portfolio/${pageId.replace(/-/g, "")}`;
}

interface Props {
  recordMap: ExtendedRecordMap;
}

export function NotionPortfolioFull({ recordMap }: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          Chargement du portfolio…
        </div>
      }
    >
      <div className="notion-portfolio-wrapper">
        <NotionRenderer
          recordMap={recordMap}
          fullPage={false}
          darkMode={false}
          mapPageUrl={mapPageUrl}
          components={{ Collection, Modal }}
          showCollectionViewDropdown={false}
          disableHeader
        />
      </div>
    </Suspense>
  );
}
