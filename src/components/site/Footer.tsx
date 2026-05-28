import { Link } from "@tanstack/react-router";
import logoOrange from "@/assets/Logo freelance orange long.png";

export function Footer() {
  return (
    <footer className="mt-20 rounded-t-[2.5rem] bg-foreground px-6 py-20 text-background md:rounded-t-[4rem] md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-background/50">
            Une idée en tête ?
          </p>
          <h2 className="mx-auto mt-6 max-w-4xl text-balance font-display text-4xl font-bold leading-[0.9] tracking-tighter md:text-7xl lg:text-8xl">
            On commence par un{" "}
            <span className="text-primary">café virtuel</span> ?
          </h2>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-background px-10 py-5 font-display text-lg font-bold text-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground md:text-xl"
          >
            Démarrer la discussion →
          </Link>
        </div>

        <div className="mt-24 border-t border-background/10 pt-12">
          {/* Plan du site + réseaux */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <img src={logoOrange} alt="STUDIO.SOCIAL" className="h-14 w-auto" />
            </div>

            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-background/40">Plan du site</p>
              <nav className="flex flex-col gap-2 font-mono text-xs text-background/60">
                <Link to="/" className="hover:text-background">Accueil</Link>
                <Link to="/a-propos" className="hover:text-background">À propos</Link>
                <Link to="/services" className="hover:text-background">Services</Link>
                <Link to="/portfolio" className="hover:text-background">Portfolio</Link>
                <Link to="/blog" className="hover:text-background">Blog</Link>
                <Link to="/contact" className="hover:text-background">Contact</Link>
              </nav>
            </div>

            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-background/40">Réseaux</p>
              <nav className="flex flex-col gap-2 font-mono text-xs text-background/60">
                <a href="https://www.instagram.com/zr_socialmedia/" target="_blank" rel="noreferrer noopener" className="hover:text-background">Instagram</a>
                <a href="https://www.linkedin.com/in/zinebrais-brandcontentmanager/" target="_blank" rel="noreferrer noopener" className="hover:text-background">LinkedIn</a>
              </nav>
            </div>

            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-background/40">Légal</p>
              <nav className="flex flex-col gap-2 font-mono text-xs text-background/60">
                <Link to="/mentions-legales" className="hover:text-background">Mentions légales</Link>
                <Link to="/confidentialite" className="hover:text-background">Confidentialité</Link>
                <Link to="/cookies" className="hover:text-background">Cookies</Link>
              </nav>
            </div>
          </div>

          <p className="mt-12 text-right font-mono text-[10px] uppercase tracking-widest text-background/30">
            © {new Date().getFullYear()} Zineb Rais — Made with love & a lot of coffee ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
