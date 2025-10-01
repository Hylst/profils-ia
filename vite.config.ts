import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        // Pour Vercel, les variables d'environnement côté client doivent être préfixées avec VITE_
        'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              // Séparer les dépendances lourdes pour optimiser le bundle
              'google-genai': ['@google/genai'],
              'framer-motion': ['framer-motion'],
              'react-vendor': ['react', 'react-dom']
            }
          },
          // Supprimer les avertissements concernant les directives "use client" de framer-motion
          onwarn(warning, warn) {
            // Ignorer les avertissements sur les directives "use client" de framer-motion
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && 
                warning.message.includes('use client') && 
                warning.id?.includes('framer-motion')) {
              return;
            }
            warn(warning);
          }
        },
        chunkSizeWarningLimit: 1000
      },
      // Copier les fichiers du dossier public vers le build
      publicDir: 'public',
      // Configuration pour gérer les directives "use client" de framer-motion
      ssr: {
        noExternal: ['framer-motion']
      }
    };
});
