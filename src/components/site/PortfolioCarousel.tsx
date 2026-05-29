import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import banner01 from "@/assets/portfolio/conferencier-international.png";
import banner02 from "@/assets/portfolio/fondateur-agence-ads.png";
import banner03 from "@/assets/portfolio/hopla-cloud.png";
import banner04 from "@/assets/portfolio/ludinautes.png";
import banner05 from "@/assets/portfolio/maxime-tournoux.png";
import banner06 from "@/assets/portfolio/juliette-joyeuse.png";
import banner07 from "@/assets/portfolio/aurelien-richard.png";
import banner08 from "@/assets/portfolio/jonathan-charlet.png";
import banner09 from "@/assets/portfolio/linsay-ribeiro.png";
import banner10 from "@/assets/portfolio/yoann-benfredj.png";
import banner11 from "@/assets/portfolio/arnaud-coudiere.png";

const CLIENTS = [
  { name: "Nacer Ben Abdeljalil", sector: "Conférencier international", img: banner01 },
  { name: "Franck Caubet", sector: "Fondateur · Agence ADS Catalyse", img: banner02 },
  { name: "Kirvanee Soobraydoo Chooramun", sector: "Cloud & Tech · Hopla Cloud", img: banner03 },
  { name: "Ludinautes", sector: "Éducation · Ludopédagogie", img: banner04 },
  { name: "Maxime Tournoux", sector: "Coaching · Personal Branding", img: banner05 },
  { name: "Juliette Joyeuse", sector: "Fondatrice · La Prospection Joyeuse", img: banner06 },
  { name: "Aurélien Richard", sector: "Consultant SEO freelance", img: banner07 },
  { name: "Jonathan Charlet", sector: "Création de sites web sur mesure", img: banner08 },
  { name: "Linsay Calif Ribeiro", sector: "Avocate en droit du travail", img: banner09 },
  { name: "Yoann Benfredj", sector: "Fondateur · CallKom · Agents vocaux IA", img: banner10 },
  { name: "Arnaud Coudière", sector: "Fondateur · Terre d'Aloé", img: banner11 },
] as const;

export function PortfolioCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(id);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            (02) derniers projets
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Mes clients en{" "}
            <span className="font-serif italic text-primary">vedette</span>
          </h2>
        </div>

        <div className="-mx-2 overflow-hidden px-2">
          <div ref={emblaRef}>
            <div className="flex gap-6">
              {CLIENTS.map((c, i) => (
                <div
                  key={i}
                  className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_80%] md:flex-[0_0_60%] lg:flex-[0_0_46%]"
                >
                  <div
                    className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                      i === selectedIndex
                        ? "border-primary shadow-lg scale-[1.01]"
                        : "border-transparent opacity-70"
                    }`}
                  >
                    <img
                      src={c.img}
                      alt={`Bannière LinkedIn — ${c.name}`}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 px-1">
                    <p className="font-display text-lg font-bold">{c.name}</p>
                    <p className="mt-0.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {c.sector}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={scrollPrev}
            aria-label="Précédent"
            className="grid size-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
          >
            ←
          </button>
          <button
            onClick={scrollNext}
            aria-label="Suivant"
            className="grid size-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
          >
            →
          </button>
          <div className="flex flex-1 items-center gap-2">
            {CLIENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Client ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === selectedIndex
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
          <Link
            to="/portfolio"
            className="shrink-0 inline-flex items-center justify-center rounded-full border-2 border-foreground px-6 py-2.5 font-display text-sm font-bold transition-colors hover:bg-foreground hover:text-card"
          >
            Découvrir tout le portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
