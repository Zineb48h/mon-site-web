import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/mentions-legales")({
  component: MentionsLegalesPage,
  head: () => ({
    meta: [
      { title: "Mentions légales · STUDIO.SOCIAL" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function MentionsLegalesPage() {
  return (
    <SiteLayout>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold mb-2">Mentions légales</h1>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-12">
            Dernière mise à jour : mai 2025
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">1. Éditeur du site</h2>
              <p>Le présent site est édité par :</p>
              <ul className="mt-3 space-y-1">
                <li><strong className="text-foreground">Dénomination :</strong> Rais Zineb</li>
                <li><strong className="text-foreground">Forme juridique :</strong> Entreprise individuelle (EI)</li>
                <li><strong className="text-foreground">SIRET :</strong> 932 531 858 00011</li>
                <li><strong className="text-foreground">Siège social :</strong> Toulouse, France</li>
                <li><strong className="text-foreground">Activité :</strong> Social Media Management — conseil en stratégie digitale et création de contenu</li>
                <li><strong className="text-foreground">Contact :</strong>{" "}
                  <a href="mailto:zinebrais4@gmail.com" className="underline hover:text-foreground">
                    zinebrais4@gmail.com
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                En tant que micro-entrepreneur, Rais Zineb n'est pas assujettie à la TVA (art. 293 B du CGI) — mention « TVA non applicable ».
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">2. Directrice de la publication</h2>
              <p>Rais Zineb, en qualité d'éditrice du site.</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">3. Hébergement</h2>
              <p>[À compléter avec le nom, l'adresse et les coordonnées de l'hébergeur]</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">4. Propriété intellectuelle</h2>
              <p>
                L'ensemble des éléments composant ce site (textes, visuels, photographies, logos, icônes, structure, charte graphique) est la propriété exclusive de Rais Zineb ou fait l'objet d'une autorisation d'utilisation, sauf mention contraire.
              </p>
              <p className="mt-3">
                Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Rais Zineb. Toute exploitation non autorisée est constitutive de contrefaçon et passible de poursuites judiciaires conformément aux articles L.335-2 et suivants du Code de la propriété intellectuelle.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">5. Responsabilité</h2>
              <p>
                Rais Zineb s'efforce d'assurer l'exactitude et la mise à jour des informations publiées sur ce site, dont elle se réserve le droit de corriger le contenu à tout moment. Rais Zineb ne peut cependant en garantir l'exhaustivité ni l'absence d'erreur.
              </p>
              <p className="mt-3">
                Les liens hypertextes présents sur le site peuvent renvoyer vers des sites tiers. Rais Zineb n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou aux dommages pouvant résulter de leur consultation.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">6. Droit applicable</h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </div>

          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
