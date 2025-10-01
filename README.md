<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🎨 Ton Profil IA - Générateur de Portraits Artistiques

**Ton Profil IA** est une application web innovante qui transforme vos photos de portrait en créations artistiques uniques grâce à l'intelligence artificielle Google Gemini. Explorez plus de 100 styles différents allant des carrières professionnelles aux univers fantastiques, en passant par les époques historiques et les styles artistiques.

## ✨ Fonctionnalités principales

- 🤖 **IA Avancée** : Utilise Google Gemini 2.5 Flash Image Preview pour des transformations photoréalistes
- 🎭 **100+ Styles** : 14 catégories incluant carrières, fantaisie, histoire, art, sports, musique, etc.
- 🖼️ **Interface Polaroid** : Cartes interactives avec drag & drop et animations fluides
- 👥 **Adaptation Genre** : Prompts intelligents adaptés selon le genre sélectionné
- 📦 **Albums ZIP** : Téléchargement individuel ou création d'albums complets
- 📱 **Responsive** : Interface optimisée mobile et desktop avec support tactile

## 🚀 Démarrage rapide

### Prérequis
- **Node.js** 18+ 
- **Clé API Google Gemini** ([Obtenir une clé](https://ai.google.dev/))

### Installation locale

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd profil-ia
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'API**
   - Créer un fichier `.env.local` à la racine
   - Ajouter votre clé API Gemini :
   ```env
   GEMINI_API_KEY=votre_cle_api_ici
   ```

4. **Lancer l'application**
   ```bash
   npm run dev
   ```

5. **Ouvrir dans le navigateur**
   ```
   http://localhost:5173
   ```

## 🌐 Déploiement sur Vercel

### Déploiement automatique (recommandé)

1. **Connecter à Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Connecter votre compte GitHub/GitLab
   - Importer le projet depuis votre repository

2. **Configuration des variables d'environnement**
   - Dans le dashboard Vercel, aller dans Settings > Environment Variables
   - Ajouter : `GEMINI_API_KEY` avec votre clé API

3. **Déployer**
   - Vercel déploie automatiquement à chaque push sur la branche main
   - L'URL de production sera générée automatiquement

### Déploiement manuel via CLI

1. **Installer Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Se connecter à Vercel**
   ```bash
   vercel login
   ```

3. **Déployer le projet**
   ```bash
   vercel --prod
   ```

4. **Configurer les variables d'environnement**
   ```bash
   vercel env add GEMINI_API_KEY
   ```

## 🏗️ Architecture technique

### Stack technologique
- **Frontend** : React 19.1.1 + TypeScript 5.8.2
- **Build Tool** : Vite 6.2.0
- **Styling** : Tailwind CSS + Framer Motion
- **IA** : Google Gemini 2.5 Flash Image Preview
- **Utilitaires** : JSZip, clsx, tailwind-merge

### Structure du projet
```
profil-ia/
├── components/           # Composants React réutilisables
│   ├── ui/              # Composants UI de base
│   ├── PolaroidCard.tsx # Carte photo interactive
│   ├── PresetSelector.tsx # Sélecteur de styles
│   └── ...
├── services/            # Services et API
│   └── geminiService.ts # Interface avec l'API Gemini
├── lib/                 # Utilitaires et helpers
├── public/              # Assets statiques
├── presets.ts           # Configuration des 100+ styles
├── App.tsx              # Composant principal
└── ...
```

### Stockage et données
- **LocalStorage** : Compteur d'utilisation (limite de 5 générations)
- **État React** : Gestion des images et de l'interface
- **Pas de base de données** : Application entièrement côté client

## 🎨 Catégories de styles disponibles

| Catégorie | Exemples de styles |
|-----------|-------------------|
| **Carrières** | Corporate, Scientifique, Chef Cuisinier, Pilote, Médecin |
| **Créatif & Fantaisie** | Super-héros, Magicien, Chevaucheur de Dragon |
| **Époques Historiques** | Égypte Antique, Viking, Far West, Samouraï |
| **Styles Artistiques** | Pop Art, Aquarelle, Cyberpunk, Cubisme |
| **Sports & Fitness** | Athlète Olympique, Surfeur, Alpiniste |
| **Science-Fiction** | Jedi, Cyborg, Colon de Mars, Agent Blade Runner |
| **Et 8 autres catégories...** | Musique, Aventure, Cuisine, Mythologie, etc. |

## 🔧 Configuration avancée

### Variables d'environnement
```env
# Obligatoire
GEMINI_API_KEY=your_gemini_api_key_here

# Optionnel (pour le développement)
VITE_DEV_MODE=true
```

### Build de production
```bash
npm run build
npm run preview  # Prévisualiser le build
```

### Personnalisation des styles
Les styles sont définis dans `presets.ts`. Vous pouvez :
- Ajouter de nouvelles catégories
- Modifier les prompts existants
- Créer des variations par genre

## 📝 Licence

Ce projet est sous licence Apache 2.0. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation
- Ajouter de nouveaux styles

## 📞 Support

- **Documentation** : Consultez [about.md](about.md) pour plus de détails
- **Changelog** : Voir [changelog.md](changelog.md) pour l'historique des versions
- **Issues** : Utilisez le système d'issues GitHub pour signaler des problèmes

---

**Créé avec ❤️ et propulsé par Google Gemini AI**
