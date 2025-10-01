/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Preset, PresetCategory } from '../presets';
import { cn } from '../lib/utils';

type Gender = 'male' | 'female';
type ImageStatus = 'pending' | 'done' | 'error';
interface GeneratedImage {
    status: ImageStatus;
    url?: string;
    error?: string;
}

interface PresetSelectorProps {
    categories: PresetCategory[];
    onSelectPreset: (preset: Preset) => void;
    generatedImages: Record<string, GeneratedImage>;
    isDisabled: boolean;
    gender: Gender | null;
}

const getPresetDisplayName = (preset: Preset, gender: Gender | null): string => {
    if (gender === 'male' && preset.maleName) {
        return preset.maleName;
    }
    if (gender === 'female' && preset.femaleName) {
        return preset.femaleName;
    }
    return preset.name;
};

const PresetSelector: React.FC<PresetSelectorProps> = ({ categories, onSelectPreset, generatedImages, isDisabled, gender }) => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

    const activeCategory = categories.find(c => c.name === selectedCategory);

    return (
        <div className="bg-stone-900/60 backdrop-blur-md rounded-lg border border-amber-900/60 p-4">
            <div className="flex flex-wrap gap-2 mb-4">
                {categories.map(category => (
                    <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={cn(
                            "px-3 py-1 text-sm rounded-full transition-colors duration-200",
                            selectedCategory === category.name
                                ? "bg-amber-500 text-stone-900 font-bold"
                                : "bg-stone-800/70 hover:bg-stone-700 text-amber-100"
                        )}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="relative h-64 overflow-y-auto pr-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-2 gap-2"
                    >
                        {activeCategory?.presets.map(preset => {
                            const status = generatedImages[preset.name]?.status;
                            const hasError = status === 'error';
                            const isPending = status === 'pending';
                            const isDone = status === 'done';
                            const displayName = getPresetDisplayName(preset, gender);

                            return (
                                <button
                                    key={preset.name}
                                    onClick={() => onSelectPreset(preset)}
                                    disabled={isPending || isDisabled}
                                    className={cn(
                                        "p-2 text-sm text-left rounded-md transition-all duration-200 h-16 flex flex-col justify-center items-center text-center",
                                        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-900 focus:ring-amber-400",
                                        "disabled:opacity-60 disabled:cursor-not-allowed",
                                        hasError
                                            ? "bg-red-900/50 hover:bg-red-800/60 text-red-200"
                                            : "bg-stone-800/70 hover:bg-stone-700/90 text-amber-100",
                                        isPending && "cursor-wait",
                                        isDone && "border-2 border-amber-500/50"
                                    )}
                                >
                                    <span className="font-semibold">{displayName}</span>
                                    {isPending && <span className="text-xs text-amber-300">Génération...</span>}
                                    {hasError && <span className="text-xs text-red-300">Échec</span>}
                                </button>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PresetSelector;