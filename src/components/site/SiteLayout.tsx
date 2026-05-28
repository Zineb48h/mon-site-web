import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ExitIntentPopup } from "./ExitIntentPopup";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Header />
      <main className="pt-28 md:pt-32">{children}</main>
      <Footer />
      <ExitIntentPopup />
    </div>
  );
}
