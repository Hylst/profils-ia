/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface FooterProps {
    onInfoClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onInfoClick }) => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-stone-950/70 backdrop-blur-sm p-3 z-50 text-stone-400 text-xs sm:text-sm border-t border-amber-900/30">
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 px-4">
                <div className="text-center sm:text-left">
                    <div className="flex items-center gap-3 justify-center sm:justify-start flex-wrap">
                        <span>Remixé par Geoffroy Streit</span>
                        <span className="hidden sm:inline">|</span>
                        <span>Utilisation Libre</span>
                    </div>
                    <p className="text-stone-500 text-xs mt-1">Note : L'utilisation de modèles d'IA a un impact environnemental.</p>
                </div>
                
                <div className="flex items-center gap-4">
                     <button onClick={onInfoClick} className="text-stone-300 hover:text-white transition-colors" aria-label="Plus d'informations">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <span className="font-semibold text-amber-100">Propulsé par Gemini</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;