/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageStatus } from '../types';

type ImageStatus = 'pending' | 'done' | 'error';

interface PolaroidCardProps {
    imageUrl: string | null;
    themeName: string;
    status: ImageStatus;
    error?: string;
    onDownload?: (imageUrl: string, themeName: string) => void;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({ imageUrl, themeName, status, error, onDownload }) => {
    return (
        <div className="relative w-full h-full flex flex-col justify-between bg-white text-black shadow-lg [transform:translateZ(0)]">
            {/* Image container */}
            <div className="relative w-full aspect-square bg-neutral-200 flex items-center justify-center group">
                <AnimatePresence mode="wait">
                    {status === 'pending' && (
                         <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/20"
                        >
                            <svg className="animate-spin h-12 w-12 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="mt-2 text-sm text-white font-semibold">Génération en cours...</p>
                        </motion.div>
                    )}
                    
                    {status === 'error' && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center ${
                                error === 'QUOTA_EXHAUSTED' ? 'bg-orange-600/90' : 'bg-red-800/90'
                            }`}
                        >
                            {error === 'QUOTA_EXHAUSTED' ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                    <p className="font-bold text-sm">Quota épuisé</p>
                                    <p className="text-xs mt-1 mb-2">Votre quota Gemini API gratuit est épuisé</p>
                                    <a 
                                        href="https://ai.google.dev/pricing" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                                    >
                                        Passer au plan payant
                                    </a>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <p className="font-bold text-sm">Échec de la génération</p>
                                    <p className="text-xs mt-1">{error}</p>
                                </>
                            )}
                        </motion.div>
                    )}

                    {(status === 'done' || (status === 'error' && imageUrl)) && imageUrl && (
                        <>
                            <motion.img
                                key={imageUrl}
                                src={imageUrl}
                                alt={themeName}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full object-cover"
                            />
                             {onDownload && status === 'done' && themeName !== "Votre Photo Originale" && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (imageUrl) onDownload(imageUrl, themeName);
                                    }}
                                    className="absolute top-2 right-2 z-30 p-2 bg-black/60 rounded-full text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 scale-90 group-hover:scale-100"
                                    aria-label="Télécharger l'image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                        </>
                    )}

                    {status !== 'pending' && !imageUrl && (
                         <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center bg-neutral-300"
                        >
                           <p className="text-neutral-500">Image non disponible</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* Caption */}
            <div className="w-full p-4 flex-grow flex items-center justify-center">
                <p className="font-permanent-marker text-xl md:text-2xl text-center text-neutral-800">
                    {themeName}
                </p>
            </div>
        </div>
    );
};

export default PolaroidCard;