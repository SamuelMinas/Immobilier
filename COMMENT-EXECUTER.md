# TransMedia — maquette immobilière (Bénin)

Maquette front-end d'une plateforme mettant en relation chercheurs de logements,
propriétaires et agences immobilières au Bénin.

## Contenu

| Page | Fichier |
| --- | --- |
| Accueil + recherche | `src/routes/index.tsx` |
| Annonces avec filtres | `src/routes/annonces.index.tsx` |
| Fiche d'un bien | `src/routes/annonces.$id.tsx` |
| Publier une annonce | `src/routes/publier.tsx` |
| Annuaire des agences | `src/routes/agences.tsx` |
| Assistant IA (recommandations) | `src/routes/assistant.tsx` |
| Connexion / inscription | `src/routes/connexion.tsx` |

- Annonces et agences : `src/data/properties.ts` (données d'exemple, aucun backend).
- Filtres de recherche dans l'URL : `src/data/search.ts`.
- Couleurs, polices, ombres : `src/styles.css`.
- Les formulaires affichent une confirmation mais n'enregistrent rien.

## Lancer la maquette en local

Prérequis : Node.js 20+ et [bun](https://bun.sh) (ou npm).

```sh
bun install     # ou npm install
bun run dev     # ou npm run dev
```

Puis ouvrir l'adresse affichée (http://localhost:8080).

Autres commandes :

```sh
bun run build    # build de production
bun run test     # tests
bun run lint     # vérification du code
```

## Assistant IA

La page « Assistant IA » interroge le modèle via Lovable AI Gateway. En local,
elle a besoin de la clé d'API dans une variable d'environnement :

```sh
export LOVABLE_API_KEY="votre-clé"
bun run dev
```

Sans cette clé, la page affiche un message « Service d'IA non configuré » et le
reste de la maquette fonctionne normalement.

## Remarques

- Numéros de téléphone, noms d'agences, prix et photos sont inventés.
- Pour un vrai produit : base de données, comptes utilisateurs et upload de
  photos restent à connecter.
