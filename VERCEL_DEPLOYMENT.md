# Guide de Déploiement Vercel

## Configuration des Variables d'Environnement

Pour que l'application fonctionne correctement sur Vercel, vous devez configurer la variable d'environnement suivante :

### 1. Dans le Dashboard Vercel

1. Allez sur votre projet dans le dashboard Vercel
2. Cliquez sur l'onglet "Settings"
3. Sélectionnez "Environment Variables" dans le menu latéral
4. Ajoutez la variable suivante :

**Variable requise :**
- **Nom :** `VITE_GEMINI_API_KEY`
- **Valeur :** Votre clé API Gemini (commence par `AIza...`)
- **Environnements :** Production, Preview, Development

### 2. Obtenir une Clé API Gemini

1. Rendez-vous sur [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Connectez-vous avec votre compte Google
3. Cliquez sur "Create API Key"
4. Copiez la clé générée

### 3. Gestion des Quotas

L'application utilise le modèle `gemini-2.5-flash-image-preview` qui a des limites de quota :

- **Niveau gratuit :** Limité en requêtes par minute et par jour
- **Niveau payant :** Quotas plus élevés

**En cas d'erreur de quota :**
- L'application attend automatiquement le délai recommandé par l'API
- Vérifiez votre plan de facturation sur [Google Cloud Console](https://console.cloud.google.com/)
- Considérez l'upgrade vers un plan payant pour des quotas plus élevés

### 4. Redéploiement

Après avoir ajouté les variables d'environnement :
1. Retournez à l'onglet "Deployments"
2. Cliquez sur "Redeploy" sur le dernier déploiement
3. Ou poussez un nouveau commit pour déclencher un redéploiement automatique

## Optimisations Incluses

✅ **Variables d'environnement** : Support des préfixes `VITE_` pour Vercel
✅ **Gestion des quotas** : Retry automatique avec délais intelligents  
✅ **Bundle optimisé** : Code splitting pour réduire la taille
✅ **Framer Motion** : Configuration pour éviter les warnings
✅ **Manifest PWA** : Fichier manifest.json valide

## Dépannage

### Images non générées
- Vérifiez que `VITE_GEMINI_API_KEY` est bien configurée
- Consultez les logs de la console pour les erreurs de quota
- Attendez le délai recommandé en cas d'erreur 429

### Erreurs de build
- Les warnings framer-motion sont normaux et n'affectent pas le fonctionnement
- Le bundle peut être volumineux mais est optimisé avec le code splitting