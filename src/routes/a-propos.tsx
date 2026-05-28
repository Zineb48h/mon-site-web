import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { NewsletterCTA } from "@/components/site/NewsletterCTA";
import zinebBureauSrc from "@/assets/zineb bureau .png";

export const Route = createFileRoute("/a-propos")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "À propos · STUDIO.SOCIAL — Social Media Manager freelance" },
      {
        name: "description",
        content:
          "Rencontre la social media manager derrière STUDIO.SOCIAL : parcours, méthode et valeurs. Une approche créative et data-driven pour faire briller ta marque.",
      },
      { property: "og:title", content: "À propos · STUDIO.SOCIAL" },
      {
        property: "og:description",
        content:
          "Mon histoire, ma méthode en 4 étapes, et les valeurs qui guident chaque collaboration.",
      },
      { property: "og:url", content: "https://zinebrais.fr/a-propos" },
      { property: "og:image", content: "https://zinebrais.fr/og-image.jpg" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://zinebrais.fr/a-propos" }],
  }),
});

const METHOD = [
  {
    n: "01",
    title: "Écouter",
    desc: "On démarre par un appel découverte. Tes objectifs, ton public, tes blocages, ce qui marche déjà et ce qui te frustre.",
    bg: "bg-tint-lavender",
    rotate: "rotate-[-1deg]",
    border: "border-2 border-primary",
    shadow: "[box-shadow:5px_7px_0px_0px_#8f0002]",
  },
  {
    n: "02",
    title: "Auditer",
    desc: "Analyse de tes comptes, benchmark concurrentiel, étude des tendances dans ta niche. Je te livre un diagnostic clair.",
    bg: "bg-tint-mint",
    rotate: "rotate-[1deg]",
    border: "border-2 border-secondary",
    shadow: "[box-shadow:5px_7px_0px_0px_#023020]",
  },
  {
    n: "03",
    title: "Créer",
    desc: "Création de ta stratégie de contenu, calendrier éditorial, formats prioritaires. On co-construit une approche qui te ressemble.",
    bg: "bg-tint-lavender",
    rotate: "rotate-[-1deg]",
    border: "border-2 border-primary",
    shadow: "[box-shadow:5px_7px_0px_0px_#8f0002]",
  },
  {
    n: "04",
    title: "Mesurer",
    desc: "Reporting mensuel transparent. On itère sur ce qui performe et on abandonne ce qui ne sert pas tes objectifs.",
    bg: "bg-tint-peach",
    rotate: "rotate-[1deg]",
    border: "border-2 border-accent",
    shadow: "[box-shadow:5px_7px_0px_0px_#ff9d0a]",
  },
];

const VALUES = [
  { label: "Authentique", color: "bg-tint-peach", shadow: "[box-shadow:4px_5px_0px_0px_#ff9d0a]" },
  { label: "Créative", color: "bg-tint-lavender", shadow: "[box-shadow:4px_5px_0px_0px_#8f0002]" },
  { label: "Engagée", color: "bg-tint-mint", shadow: "[box-shadow:4px_5px_0px_0px_#023020]" },
  { label: "Passionnée", color: "bg-accent/40", shadow: "[box-shadow:4px_5px_0px_0px_#ff9d0a]" },
  { label: "À l'écoute", color: "bg-tint-lavender", shadow: "[box-shadow:4px_5px_0px_0px_#8f0002]" },
  { label: "Curieuse", color: "bg-tint-peach", shadow: "[box-shadow:4px_5px_0px_0px_#ff9d0a]" },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            (À propos)
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tighter md:text-7xl">
            Hello, moi c'est{" "}
            <span className="font-serif italic text-primary">Zineb</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            Après 5 ans dans la communication, je me suis lancée en freelance
            il y a un an et demi. Aujourd'hui j'aide les marques créatives à
            exister là où ça compte : dans le feed, dans la tête, dans le
            cœur de leur audience.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="rotate-[-2deg] overflow-hidden rounded-3xl shadow-xl outline outline-4 outline-card">
              <img
                src={zinebBureauSrc}
                alt="Zineb Rais — Social Media Manager à Toulouse"
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="mt-4 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Toulouse, France
            </p>
          </div>

          <div className="space-y-6 text-lg leading-relaxed md:col-span-3">
            <p>
              J'ai fait mes armes en agence, de l'e-commerce à l'édition de
              jeux de société, avant de me lancer à mon compte. Depuis, j'ai
              accompagné des marques dans des univers radicalement différents :
              skincare coréenne, box menstruelle, bricolage, agents vocaux IA,
              agence ADS… bref, des univers qui n'ont rien à voir entre eux, et
              c'est exactement ce que j'aime dans mon métier.
            </p>
            <p>
              Ce qui me motive ?{" "}
              <strong>Faire la différence entre poster et communiquer.</strong>{" "}
              Trop de marques publient sans stratégie, sans direction, sans
              plaisir. Mon job, c'est de transformer une présence en ligne en
              quelque chose dont tu es fier·e.
            </p>
            <p>
              Quand je ne suis pas sur Canva ou LinkedIn, tu me trouves le nez
              dans un bouquin, à me perdre dans mes loisirs créatifs ou à scroller
              TikTok (oui, ça compte comme du travail) 👀
            </p>
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="bg-card px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              (Ma méthode)
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Comment on{" "}
              <span className="font-serif italic text-primary">bosse ensemble</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {METHOD.map((m) => (
              <div
                key={m.n}
                className={`${m.bg} ${m.rotate} ${m.border} ${m.shadow} rounded-[2.5rem] p-8 transition-all duration-300 hover:rotate-0 hover:-translate-y-2`}
              >
                <span className="font-mono text-xs font-bold text-primary">
                  {m.n}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold">{m.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            (Mes valeurs)
          </p>
          <h2 className="mb-12 font-display text-4xl font-bold md:text-5xl">
            Ce qui me <span className="font-serif italic text-primary">guide</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {VALUES.map((v, i) => (
              <span
                key={v.label}
                style={{ animationDelay: `${i * 100}ms` }}
                className={`${v.color} ${v.shadow} animate-enter rounded-full border border-border px-5 py-2 font-display text-lg font-bold opacity-0 transition-transform duration-300 hover:scale-105 ${
                  i % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]"
                }`}
              >
                {v.label}
              </span>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 font-display text-lg font-bold text-primary-foreground transition-transform hover:-rotate-2"
            >
              On en parle ?
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Appel découverte gratuit · 30 min
            </span>
          </div>
        </div>
      </section>

      <NewsletterCTA />
    </SiteLayout>
  );
}
