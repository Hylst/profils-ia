# 📂 Structure du Projet "Ton Profil IA"

Ce document offre une vue d'ensemble technique de l'architecture du projet, du rôle de chaque fichier et du flux de données au sein de l'application.

## Vue d'Ensemble

"Ton Profil IA" est une **Single-Page Application (SPA)** construite avec **React** et **TypeScript**. Pour garantir la simplicité et un déploiement sans build, les dépendances (React, Framer Motion) sont importées via des URL ESM (`aistudiocdn.com`). Le style est géré par **Tailwind CSS**, chargé via un CDN.

L'application est également une **Progressive Web App (PWA)**, grâce à un **Service Worker** et un **Web Manifest**.

---

##  breakdown Détail des Fichiers et Dossiers

```
.
├── public/
│   └── icon.svg              # Logo de l'app, utilisé pour le favicon et la PWA
├── components/
│   ├── ui/
│   │   └── draggable-card.tsx # Logique de la carte 3D déplaçable avec Framer Motion
│   ├── Footer.tsx              # Pied de page fixe
│   ├── InfoModal.tsx           # Fenêtre modale d'information et de mode démo
│   ├── Logo.tsx                # Composant du logo et du slogan
│   ├── PolaroidCard.tsx        # Affiche l'image, le statut (chargement, erreur) et gère les interactions
│   └── PresetSelector.tsx      # Interface pour choisir les catégories et les styles
├── lib/
│   └── utils.ts                # Fonction utilitaire `cn` pour fusionner les classes Tailwind
├── services/
│   └── geminiService.ts        # Module central pour toute la communication avec l'API Gemini
├── about.md                    # Documentation narrative du projet
├── App.tsx                     # Composant racine, gère l'état global et l'orchestration
├── index.css                   # Styles globaux (très minime)
├── index.html                  # Point d'entrée HTML, charge les scripts et les polices
├── index.tsx                   # Monte l'application React et enregistre le Service Worker
├── manifest.json               # Fichier de manifeste pour la PWA
├── metadata.json               # Metadonnées pour la plateforme d'hébergement
├── presets.ts                  # Base de données statique des styles et des prompts
├── readme.md                   # Documentation principale du projet
├── structure.md                # Ce fichier
└── sw.js                       # Script du Service Worker pour la mise en cache et le mode hors ligne
```

### Fichiers Principaux

-   **`index.html`** : La coquille de l'application. Elle configure le `viewport`, charge Tailwind CSS, les polices Google Fonts, et le script principal `index.tsx`. Elle contient également les liens vers le manifeste PWA et le favicon.
-   **`index.tsx`** : Le point d'entrée JavaScript. Il trouve l'élément `#root` dans le DOM, y monte l'application React (`<App />`), et enregistre le service worker (`sw.js`) pour activer les fonctionnalités PWA.
-   **`App.tsx`** : Le cœur de l'application. Ce composant gère la quasi-totalité de l'état (state) :
    -   L'image téléchargée (en base64).
    -   L'état de chaque image générée (en attente, terminée, erreur).
    -   L'état global de l'interface (écran d'accueil, écran principal).
    -   L'état du zoom sur une image et de la modale d'information.
    C'est lui qui orchestre les appels au service Gemini et passe les données aux composants enfants.
-   **`sw.js`** : Le Service Worker. Il intercepte les requêtes réseau et met en cache les ressources essentielles de l'application (`index.html`, scripts, etc.). Cela permet des chargements quasi instantanés lors des visites ultérieures et rend l'application fonctionnelle même sans connexion Internet.
-   **`manifest.json`** : Le manifeste de la PWA. Il décrit l'application au navigateur, permettant aux utilisateurs de l' "installer" sur leur écran d'accueil ou leur bureau.

### Composants (`/components`)

-   **`PolaroidCard.tsx`** : Un des composants les plus complexes. Il ne se contente pas d'afficher une image, mais gère aussi l'affichage d'un état de chargement, d'erreur, et les interactions utilisateur comme le téléchargement.
-   **`PresetSelector.tsx`** : Affiche les catégories et les styles disponibles à partir de `presets.ts`. Il met en évidence les styles déjà générés, en cours ou en erreur.
-   **`Footer.tsx`** : Le pied de page fixe de l'application, contenant les crédits et le bouton pour ouvrir la modale d'information.
-   **`InfoModal.tsx`** : Une fenêtre modale qui présente l'application, son fonctionnement et le quota de générations restantes pour la démo.
-   **`Logo.tsx`** : Affiche le logo et le slogan de l'application sur l'écran d'accueil.
-   **`ui/draggable-card.tsx`** : Le composant technique qui gère l'effet 3D et la physique de glisser-déposer des cartes Polaroid.

### Services (`/services`)

-   **`geminiService.ts`** : Le seul module qui communique avec l'API Google Gemini. Il abstrait toute la complexité :
    -   Récupération sécurisée de la clé API depuis les variables d'environnement.
    -   Formatage de la requête avec l'image et le prompt.
    -   Implémentation d'une logique de **tentatives multiples (retry)** en cas d'erreur serveur.
    -   Gestion d'une **instruction de secours (fallback)** si le prompt initial est bloqué.
    -   Traitement de la réponse pour en extraire l'image.

## 🔄 Flux de Données (Data Flow)

Le flux de données est unidirectionnel, ce qui est typique d'une application React.

1.  **Initialisation** : L'utilisateur arrive sur l'application. `App.tsx` affiche l'écran de téléchargement d'image.
2.  **Téléchargement de l'Image** : L'utilisateur sélectionne une image via `<input type="file">`. L'événement `onChange` dans `App.tsx` lit le fichier, le convertit en data URL (base64) et le stocke dans son état (`originalImage`).
3.  **Génération d'un Style** :
    -   L'utilisateur clique sur un bouton de style dans `PresetSelector.tsx`.
    -   Un appel de fonction (`onSelectPreset`) est propagé vers `App.tsx` avec les informations du style choisi.
    -   `App.tsx` met à jour l'état `generatedImages` pour ce style à `{ status: 'pending' }`.
    -   `App.tsx` appelle la fonction `generateThemedImage` de `geminiService.ts`, en lui passant l'image et le prompt.
4.  **Réponse de l'API** :
    -   `geminiService.ts` gère l'appel API.
    -   Une fois la réponse reçue, `App.tsx` met à jour l'état `generatedImages` pour ce style avec `{ status: 'done', url: '...' }` en cas de succès, ou `{ status: 'error', error: '...' }` en cas d'échec.
5.  **Rendu** : Le changement d'état déclenche un nouveau rendu. Le `PolaroidCard` correspondant au style généré affiche maintenant l'image, ou un indicateur d'erreur.