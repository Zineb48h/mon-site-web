import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logoSrc from "@/assets/logo freelance bordeau long.png";

const NAV_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/a-propos", label: "À propos" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`fixed top-4 left-1/2 z-50 w-[94%] max-w-5xl -translate-x-1/2 border border-border bg-card/80 px-5 py-3 shadow-sm backdrop-blur-md md:top-6 md:rounded-full md:px-6 ${open ? "rounded-[2rem]" : "rounded-full"}`}>
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center">
          <img src={logoSrc} alt="Zineb Rais" className="h-10 w-auto" />
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-7 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/contact"
            className="rounded-full bg-foreground px-5 py-2 font-display text-sm font-bold text-card transition-all duration-300 hover:bg-primary"
          >
            On en parle ?
          </Link>
        </div>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-9 place-items-center rounded-full border border-border md:hidden"
        >
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <div className="flex flex-col gap-1">
            <span className={`block h-0.5 w-4 bg-foreground transition-all duration-200 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-0.5 w-4 bg-foreground transition-all duration-200 ${open ? "-translate-y-[0px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="mt-3 flex flex-col gap-1 border-t border-border/40 pt-3 pb-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-display text-base font-bold hover:bg-muted"
              activeProps={{ className: "text-primary" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-2xl bg-primary px-4 py-3 text-center font-display text-base font-bold text-primary-foreground"
          >
            On en parle ?
          </Link>
        </div>
      )}
    </nav>
  );
}
