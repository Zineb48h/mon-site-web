import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: "Politique de cookies · STUDIO.SOCIAL" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function CookiesPage() {
  return (
    <SiteLayout>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold mb-2">Politique de cookies</h1>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-12">
            Dernière mise à jour : mai 2025
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">1. Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) lors de la visite d'un site web. Il permet au site de mémoriser des informations relatives à votre navigation afin d'améliorer votre expérience ou de mesurer l'audience.
              </p>
              <p className="mt-3">
                Conformément à l'article 82 de la loi Informatique et Libertés et aux recommandations de la CNIL, certains cookies nécessitent votre consentement préalable avant d'être déposés.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">2. Cookies utilisés sur ce site</h2>
              <div className="space-y-4">
                <div className="rounded-2xl border border-border p-5">
                  <p className="font-bold text-foreground">Cookies strictement nécessaires</p>
                  <p className="mt-1 text-sm">Ces cookies sont indispensables au fonctionnement du site. Ils ne collectent aucune information personnelle et ne peuvent pas être désactivés.</p>
                  <p className="mt-2 text-sm"><strong>Exemples :</strong> mémorisation de vos préférences de navigation, sécurisation des formulaires (token CSRF).</p>
                  <p className="mt-2 text-sm"><strong>Consentement requis :</strong> Non</p>
                </div>
                <div className="rounded-2xl border border-border p-5">
                  <p className="font-bold text-foreground">Cookies de mesure d'audience (analytiques)</p>
                  <p className="mt-1 text-sm">Ces cookies permettent de mesurer la fréquentation du site et d'analyser les comportements de navigation afin d'améliorer le contenu proposé.</p>
                  <p className="mt-2 text-sm"><strong>Outil utilisé :</strong> [ex. Google Analytics, Plausible — à compléter si utilisé]</p>
                  <p className="mt-2 text-sm"><strong>Durée :</strong> 13 mois maximum</p>
                  <p className="mt-2 text-sm"><strong>Consentement requis :</strong> Oui</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">3. Durée de conservation</h2>
              <p>
                Conformément aux recommandations de la CNIL, aucun cookie n'est conservé au-delà de <strong className="text-foreground">13 mois</strong> après son dépôt. Passé ce délai, votre consentement est de nouveau sollicité.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">4. Gérer vos préférences</h2>
              <p>Vous pouvez à tout moment désactiver ou supprimer les cookies depuis les paramètres de votre navigateur :</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer noopener" className="underline hover:text-foreground">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-le-pistage-firefox" target="_blank" rel="noreferrer noopener" className="underline hover:text-foreground">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer noopener" className="underline hover:text-foreground">Safari</a></li>
                <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noreferrer noopener" className="underline hover:text-foreground">Microsoft Edge</a></li>
              </ul>
              <p className="mt-4">
                Attention : la désactivation de certains cookies peut affecter le bon fonctionnement du site et dégrader votre expérience de navigation.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">5. Contact</h2>
              <p>
                Pour toute question relative à cette politique :{" "}
                <a href="mailto:zinebrais4@gmail.com" className="underline hover:text-foreground">
                  zinebrais4@gmail.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
