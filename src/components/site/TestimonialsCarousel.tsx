import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const TESTIMONIALS = [
  {
    name: "Juliette Joyeuse",
    role: "Fondatrice · La Prospection Joyeuse",
    quote:
      "Zineb est l'une des personnes les plus réactives, disponibles et efficaces avec qui j'ai travaillé. Sa capacité à produire une quantité de contenus impressionnante, sans jamais sacrifier la qualité, force l'admiration. Elle donne le ton, elle tire le projet vers le haut, et elle rend chaque collaboration simple et enthousiasmante. Une professionnelle rare, précieuse.",
  },
  {
    name: "William VAROUX",
    role: "Dirigeant · Sécurité informatique TPE/PME",
    quote:
      "Si l'efficacité avait une égérie, ce serait sans nul doute Zineb… Prospection efficace, contact facile, mise en confiance immédiate… Mais par dessus tout, sa compétence, sa rapidité, sa disponibilité et au final son efficacité. J'aimerais travailler plus souvent avec des partenaires comme elle.",
  },
  {
    name: "Meriem M",
    role: "Gestionnaire administrative spécialisée",
    quote:
      "J'ai eu l'opportunité de collaborer avec Zineb, une Community Manager engagée, et je recommande vivement son travail. Créative, réactive et très professionnelle, elle a su proposer des contenus engageants et adaptés à mes objectifs, tout en renforçant efficacement ma présence en ligne.",
  },
  {
    name: "Marie-Claire OLIVIER",
    role: "Accompagnatrice d'entrepreneurs indépendants",
    quote:
      "Ce que j'ai vraiment apprécié ? Sa façon de rendre tout ça fluide et accessible. Pas de jargon inutile, juste des explications claires qui parlent à tout le monde. Zineb a ce don rare et précieux : elle communique de manière naturelle tout en partageant une vraie expertise.",
  },
  {
    name: "Magali Dalla Riva",
    role: "Coach · Accompagnement dirigeants",
    quote:
      "Je recommande Zineb les yeux fermés ! Elle a su transformer mon profil LinkedIn en un outil clair, impactant et parfaitement aligné avec mon activité. Professionnelle, rapide, intuitive et redoutablement efficace.",
  },
  {
    name: "Kamel Mekouar",
    role: "Talent & Marketing Manager",
    quote:
      "J'ai été agréablement surpris par sa bienveillance, sa disponibilité et sa réactivité. Elle est polyvalente (contenu, design...) et peut répondre à vos besoins avec rigueur et professionnalisme. Je recommande si vous voulez booster vos ventes à travers les réseaux sociaux.",
  },
  {
    name: "Grégory Pinaud-Plazanet",
    role: "Coach & consultant en structuration organisationnelle",
    quote:
      "Un contact facile, des propositions professionnelles pour améliorer mon profil LinkedIn et une certaine facilité de validation et de partage des fichiers source pour que je puisse les implémenter en toute autonomie. Je me suis senti accompagné tout du long.",
  },
  {
    name: "Fatou Binetou Wattara",
    role: "QA Lead · Projets digitaux",
    quote:
      "Zineb, c'est l'alliée idéale pour booster votre profil. Créative, organisée et toujours à l'écoute, elle transforme des idées en campagnes qui cartonnent. Un grand merci à toi.",
  },
  {
    name: "Roxane Boutte",
    role: "Consultante en performance organisationnelle",
    quote:
      "J'ai fait appel à Zineb pour donner enfin un côté pro à mon profil LinkedIn, et je suis absolument ravie du résultat ! La communication a été super fluide, et j'ai pu avoir le final dans un temps record. Je recommande vivement de bosser avec elle.",
  },
  {
    name: "Linsay Calif Ribeiro",
    role: "Avocate en droit du travail",
    quote:
      "Je recommande sans hésitation Zineb qui a su améliorer mon profil LinkedIn en un temps record. Elle est disponible et joviale. Elle a parfaitement su comprendre le message et l'image que je voulais transmettre.",
  },
  {
    name: "Hasnaa Ngadi",
    role: "Conférencière & Maîtresse de Cérémonie",
    quote:
      "Je recommande vivement Zineb pour son expertise, son professionnalisme, son sens de l'écoute et sa réactivité. Zineb a été rapide en exécution et a su respecter les délais annoncés.",
  },
  {
    name: "Laila MAJIDI",
    role: "Conseillère de clientèle · Bank Of Africa",
    quote:
      "Un grand merci à Zineb pour la mise à jour de mon profil. Elle a su le rendre clair, percutant et parfaitement adapté à mes objectifs. Je recommande vivement !",
  },
  {
    name: "Philippe Sylva",
    role: "Architecte infrastructure & cloud · Azure certified",
    quote:
      "J'ai eu la chance de bénéficier des conseils et services de Zineb afin d'optimiser mon profil LinkedIn. Son travail a été fantastique. Elle répond parfaitement aux besoins des clients et sait faire preuve de réactivité. Une personne que je recommande à 1000%.",
  },
  {
    name: "Sofiane Korbi",
    role: "Co-fondateur · BKBX (Développement logiciel & IA)",
    quote:
      "J'ai collaboré avec Zineb pour le copywriting de ma page LinkedIn. En un seul essai, c'était exactement ce que je voulais véhiculer, mais en mieux. L'approche est très humaine et à l'écoute de nos besoins.",
  },
  {
    name: "Aurélien Richard",
    role: "Consultant SEO freelance",
    quote:
      "Zineb s'est occupée de mon profil (PP, bannière, section infos...). Elle est hyper réactive et fait un travail de grande qualité ! Grâce à elle, j'ai un profil au top et beaucoup plus clean visuellement.",
  },
];

export function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="overflow-hidden bg-tint-peach px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            (03) ils en parlent mieux que moi
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Ce qu'ils <span className="font-serif italic text-primary">disent</span>
          </h2>
        </div>

        <div className="overflow-hidden">
          <div ref={emblaRef}>
            <div className="flex">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="min-w-0 flex-[0_0_100%] px-4 py-6">
                  <div className="relative rounded-[2.5rem] bg-card p-8 shadow-lg md:p-10">
                    <div className="absolute -right-3 -top-3 grid size-12 rotate-12 place-items-center rounded-full bg-primary text-center font-display text-[10px] font-bold text-primary-foreground md:size-14">
                      TOP!
                    </div>
                    <p className="text-center font-display text-lg font-normal leading-relaxed md:text-2xl">
                      "{t.quote}"
                    </p>
                    <div className="mt-10 flex flex-col items-center gap-1">
                      <span className="font-display text-lg font-bold">{t.name}</span>
                      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={scrollPrev}
            aria-label="Précédent"
            className="grid size-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
          >
            ←
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Avis ${i + 1}`}
                className={`size-2 rounded-full transition-all ${
                  i === selectedIndex
                    ? "w-6 bg-primary"
                    : "bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            aria-label="Suivant"
            className="grid size-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
