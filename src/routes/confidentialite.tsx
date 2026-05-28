import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/confidentialite")({
  component: ConfidentialitePage,
  head: () => ({
    meta: [
      { title: "Politique de confidentialité · STUDIO.SOCIAL" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function ConfidentialitePage() {
  return (
    <SiteLayout>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-bold mb-2">Politique de confidentialité</h1>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-12">
            Dernière mise à jour : mai 2025
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">1. Responsable du traitement</h2>
              <p>
                Le responsable du traitement des données personnelles collectées via ce site est :
              </p>
              <ul className="mt-3 space-y-1">
                <li><strong className="text-foreground">Rais Zineb</strong> — Entreprise individuelle</li>
                <li>Toulouse, France</li>
                <li>
                  <a href="mailto:zinebrais4@gmail.com" className="underline hover:text-foreground">
                    zinebrais4@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">2. Données collectées et finalités</h2>
              <p>Ce site collecte les données personnelles suivantes :</p>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-border p-5">
                  <p className="font-bold text-foreground">Formulaire de contact</p>
                  <p className="mt-1"><strong>Données :</strong> nom, adresse email, message</p>
                  <p><strong>Finalité :</strong> répondre à votre demande de renseignements ou de collaboration</p>
                  <p><strong>Base légale :</strong> intérêt légitime (art. 6.1.f du RGPD)</p>
                  <p><strong>Durée de conservation :</strong> 3 ans à compter du dernier contact</p>
                </div>
                <div className="rounded-2xl border border-border p-5">
                  <p className="font-bold text-foreground">Newsletter</p>
                  <p className="mt-1"><strong>Données :</strong> adresse email</p>
                  <p><strong>Finalité :</strong> envoi de contenus et actualités professionnelles</p>
                  <p><strong>Base légale :</strong> consentement (art. 6.1.a du RGPD)</p>
                  <p><strong>Durée de conservation :</strong> jusqu'à désinscription</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">3. Destinataires des données</h2>
              <p>
                Vos données personnelles sont exclusivement destinées à Rais Zineb. Elles ne sont ni vendues, ni louées, ni cédées à des tiers. Elles peuvent être transmises à des sous-traitants techniques (hébergeur, outil d'emailing) uniquement dans le cadre de la réalisation des finalités décrites ci-dessus, et sous couvert de garanties contractuelles suffisantes.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">4. Transferts hors Union européenne</h2>
              <p>
                Les données collectées sont hébergées et traitées au sein de l'Union européenne. En cas de recours à un outil tiers impliquant un transfert hors UE, des garanties appropriées seront mises en place (clauses contractuelles types de la Commission européenne).
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">5. Vos droits</h2>
              <p>Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li><strong className="text-foreground">Droit d'accès</strong> : obtenir une copie de vos données</li>
                <li><strong className="text-foreground">Droit de rectification</strong> : corriger des données inexactes ou incomplètes</li>
                <li><strong className="text-foreground">Droit à l'effacement</strong> : demander la suppression de vos données</li>
                <li><strong className="text-foreground">Droit d'opposition</strong> : vous opposer à un traitement fondé sur l'intérêt légitime</li>
                <li><strong className="text-foreground">Droit à la limitation</strong> : suspendre temporairement un traitement</li>
                <li><strong className="text-foreground">Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                <li><strong className="text-foreground">Droit de retrait du consentement</strong> : à tout moment, pour les traitements basés sur le consentement</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez : <a href="mailto:zinebrais4@gmail.com" className="underline hover:text-foreground">zinebrais4@gmail.com</a>. Une réponse vous sera apportée dans un délai d'un mois.
              </p>
              <p className="mt-3">
                Vous disposez également du droit d'introduire une réclamation auprès de la <strong className="text-foreground">CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) — <a href="https://www.cnil.fr" target="_blank" rel="noreferrer noopener" className="underline hover:text-foreground">www.cnil.fr</a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-4">6. Sécurité</h2>
              <p>
                Des mesures techniques et organisationnelles appropriées sont mises en œuvre pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation. Le site est accessible en HTTPS (chiffrement SSL/TLS).
              </p>
            </div>

          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
