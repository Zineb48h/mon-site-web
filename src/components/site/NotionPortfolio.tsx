"use client";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";

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
      />
    </div>
  );
}
