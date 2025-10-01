/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { cn } from '../lib/utils';

type Gender = 'male' | 'female';

interface GenderSelectorProps {
    selectedGender: Gender | null;
    onSelectGender: (gender: Gender) => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ selectedGender, onSelectGender }) => {
    return (
        <div className="mt-12 mb-2">
            <p className="text-amber-100 mb-4 text-lg">Précisez le genre de la personne sur la photo :</p>
            <div className="flex justify-center gap-6">
                <button 
                    onClick={() => onSelectGender('male')}
                    className={cn(
                        'p-4 rounded-full transition-all duration-200 border-2',
                        selectedGender === 'male' 
                            ? 'bg-amber-500/20 border-amber-500 scale-110' 
                            : 'bg-stone-800 border-stone-700 hover:border-amber-600'
                    )}
                    aria-label="Homme"
                    aria-pressed={selectedGender === 'male'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20a5 5 0 110-10 5 5 0 010 10zM12.5 11.5L20 4M16 4h4v4" />
                    </svg>
                </button>
                <button 
                    onClick={() => onSelectGender('female')}
                     className={cn(
                        'p-4 rounded-full transition-all duration-200 border-2',
                        selectedGender === 'female' 
                            ? 'bg-amber-500/20 border-amber-500 scale-110' 
                            : 'bg-stone-800 border-stone-700 hover:border-amber-600'
                    )}
                    aria-label="Femme"
                    aria-pressed={selectedGender === 'female'}
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a5 5 0 110-10 5 5 0 010 10zM12 12v9M9 17h6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default GenderSelector;