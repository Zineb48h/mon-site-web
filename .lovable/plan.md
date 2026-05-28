
## Vision

Un site **coloré, playful et original** qui te positionne comme social media manager créative. Structuré pour le SEO dès le départ (vraies routes, métadonnées, blog, sitemap) et pensé pour évoluer vers une boutique de produits digitaux.

## Étape 1 — Direction visuelle

Avant d'écrire la moindre ligne du site, je vais générer **3 directions de design rendues** (HTML/CSS réels, pas des descriptions) sur le brief "coloré & playful pour social media manager créative". Tu choisis celle qui te parle, et je construis tout le site dans cet univers.

Chaque direction variera la composition, la densité, la typographie, le rythme — mais toutes resteront dans le registre coloré/playful/original.

## Étape 2 — Pages créées dès maintenant

Une vraie route par page (essentiel SEO, vs sections ancrées sur une seule page) :

- **/** — Accueil : hero fort, services en bref, projets phares, témoignages, CTA contact
- **/a-propos** — Ton histoire, ta méthode, ta personnalité
- **/services** — Détail des offres (community management, stratégie, création de contenu…) + CTA devis
- **/portfolio** — Liste des projets/études de cas (alimentée par Notion, voir étape 3)
- **/portfolio/$slug** — Page détail d'un projet
- **/blog** — Liste des articles
- **/blog/$slug** — Article avec contenu riche, image héro, schéma SEO Article
- **/contact** — Formulaire + liens réseaux sociaux

Chaque page aura son propre `<title>`, meta description, Open Graph, canonical, et JSON-LD adapté. Plus : `sitemap.xml` dynamique + `robots.txt`.

> Le contenu sera du **placeholder réaliste** cohérent avec le métier de SMM, que tu remplaceras ensuite par tes vrais textes/projets.

## Étape 3 — Portfolio via API Notion

Connexion de ton workspace Notion via le connecteur Lovable (OAuth, pas besoin de copier des clés). Ensuite :

- Tu prépares **une base de données Notion** "Projets" avec des propriétés type : Titre, Slug, Client, Catégorie, Date, Image de couverture, Description courte, Contenu.
- Le site lit cette base via une **server function** sécurisée (API Notion → JSON → composants React stylés).
- Les pages `/portfolio` et `/portfolio/$slug` sont rendues côté serveur → indexables Google (mieux que l'iframe Notion).
- Mise à jour : tu édites dans Notion, ça apparaît sur le site (pas de cache au début ; on pourra en ajouter plus tard si besoin de perf).

## Étape 4 — Blog SEO

Pour le blog, deux options simples — je propose qu'on parte sur **Notion aussi** (même méthode que le portfolio) : tu écris tes articles dans une seconde base Notion "Articles", le site les affiche en pages dédiées avec :

- Rendu serveur (SSR) → 100% indexable
- Titre, meta description, OG image, JSON-LD `Article`
- Rich text Notion converti en composants React stylés (titres, paragraphes, images, listes, citations, code)
- Tri par date, slug propre dans l'URL (`/blog/mon-article`)

Si tu préfères gérer le blog directement dans une base de données du site (sans Notion), dis-le moi — c'est ~équivalent côté SEO.

## Étape 5 — Préparer la vente de produits digitaux (sans l'activer maintenant)

On ne construit pas la boutique tout de suite, mais on prépare le terrain :

- Architecture des routes prête à accueillir `/boutique` et `/boutique/$slug`
- Quand tu seras prête à vendre, on activera **Lovable Payments** (intégré, pas besoin de compte Stripe externe à gérer toi-même) avec gestion automatique TVA/compliance pour produits digitaux
- Je te le proposerai au bon moment, pas besoin de décider aujourd'hui

## Détails techniques (pour info)

- **Stack** : TanStack Start (déjà en place), React 19, Tailwind v4, design tokens dans `src/styles.css`
- **Notion** : connecteur Lovable + appels API via server functions (`src/lib/notion.functions.ts` + `src/lib/notion.server.ts`)
- **SEO** : `head()` par route, `sitemap.xml` dynamique (régénéré depuis Notion pour les routes dynamiques), `robots.txt`, JSON-LD adapté par type de page
- **Pas de Lovable Cloud nécessaire** pour cette première étape (Notion gère le contenu). On l'activera si tu ajoutes formulaire de contact persistant, newsletter, ou la boutique.
- **Formulaire de contact** : par défaut en `mailto:` vers ton adresse. Si tu veux qu'il enregistre les messages ou envoie un vrai email, on activera Lovable Cloud + email.

## Ordre d'exécution une fois le plan validé

1. Générer les 3 directions visuelles → tu choisis
2. Mettre en place le design system (couleurs, typo, composants) à partir de la direction choisie
3. Créer les 8 routes avec contenu placeholder + SEO complet
4. Connecter Notion + bâtir le rendu portfolio dynamique
5. Bâtir le rendu blog dynamique (même méthode)
6. `sitemap.xml` + `robots.txt`
7. Recap + suggestion de publier
