/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion } from 'framer-motion';

interface InfoModalProps {
    onClose: () => void;
    remainingGenerations: number;
}

const InfoModal: React.FC<InfoModalProps> = ({ onClose, remainingGenerations }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-stone-900 rounded-lg border border-amber-800/20 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative text-stone-300"
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors" aria-label="Fermer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <h2 className="font-permanent-marker text-3xl text-amber-400 mb-6">À Propos de Ton Profil IA</h2>

                <div className="space-y-6">
                    <section>
                        <h3 className="font-bold text-xl text-amber-50 mb-2">Comment ça marche ?</h3>
                        <ol className="list-decimal list-inside space-y-2">
                            <li><span className="font-semibold">Téléchargez votre photo :</span> Choisissez un portrait clair où votre visage est bien visible.</li>
                            <li><span className="font-semibold">Choisissez un style :</span> Explorez les catégories et sélectionnez un thème qui vous inspire.</li>
                            <li><span className="font-semibold">Laissez l'IA opérer :</span> Le modèle Gemini réinvente votre photo selon le style choisi.</li>
                            <li><span className="font-semibold">Créez votre album :</span> Admirez vos créations, déplacez-les sur le bureau, zoomez, et téléchargez vos favorites ou l'album complet en ZIP.</li>
                        </ol>
                    </section>

                    <section>
                        <h3 className="font-bold text-xl text-amber-50 mb-2">Fonctionnalités Clés</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-semibold">Bureau Interactif :</span> Vos créations apparaissent comme des polaroïds que vous pouvez déplacer.</li>
                            <li><span className="font-semibold">Plus de 80 Styles :</span> Une vaste bibliothèque de thèmes pour des transformations infinies.</li>
                            <li><span className="font-semibold">Album ZIP :</span> Téléchargez toutes vos images et l'original en une seule archive.</li>
                            <li><span className="font-semibold">PWA :</span> Installez l'application pour un accès rapide et une utilisation hors-ligne.</li>
                        </ul>
                    </section>
                    
                    <section className="bg-amber-900/20 border border-amber-500/30 p-4 rounded-md">
                        <h3 className="font-bold text-xl text-amber-300 mb-2">Mode Démo</h3>
                        <p>Cette version de démonstration vous permet de générer jusqu'à 5 images pour découvrir le potentiel de l'application.</p>
                        <p className="mt-2 text-lg font-semibold">Générations restantes : <span className="text-white">{remainingGenerations}</span></p>
                    </section>
                </div>

            </motion.div>
        </motion.div>
    );
};

export default InfoModal;