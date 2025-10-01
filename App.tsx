/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JSZip from 'jszip';

import { CATEGORIES, Preset } from './presets';
import { generateThemedImage } from './services/geminiService';

import Logo from './components/Logo';
import Footer from './components/Footer';
import InfoModal from './components/InfoModal';
import PolaroidCard from './components/PolaroidCard';
import PresetSelector from './components/PresetSelector';
import { DraggableCardBody, DraggableCardContainer } from './components/ui/draggable-card';
import GenderSelector from './components/GenderSelector';

type ImageStatus = 'pending' | 'done' | 'error';
type Gender = 'male' | 'female';

interface GeneratedImage {
    status: ImageStatus;
    url?: string;
    error?: string;
    position: { x: number; y: number; rotate: number };
}

const allPresets = CATEGORIES.flatMap(c => c.presets);
const MAX_GENERATIONS = 5;
const USAGE_COUNT_KEY = 'tonProfilIaUsageCount';

const getPresetDisplayName = (preset: Preset, gender: Gender | null): string => {
    if (gender === 'male' && preset.maleName) {
        return preset.maleName;
    }
    if (gender === 'female' && preset.femaleName) {
        return preset.femaleName;
    }
    return preset.name;
};

function App() {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [originalImageName, setOriginalImageName] = useState<string | null>(null);
    const [customName, setCustomName] = useState<string>('');
    const [gender, setGender] = useState<Gender | null>(null);
    const [generatedImages, setGeneratedImages] = useState<Record<string, GeneratedImage>>({});
    const [isAlbumDownloading, setIsAlbumDownloading] = useState(false);
    const [zoomedCard, setZoomedCard] = useState<{ url: string; themeName: string } | null>(null);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [remainingGenerations, setRemainingGenerations] = useState(MAX_GENERATIONS);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const deskRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const storedCount = localStorage.getItem(USAGE_COUNT_KEY);
            if (storedCount !== null) {
                const usedCount = parseInt(storedCount, 10);
                setRemainingGenerations(Math.max(0, MAX_GENERATIONS - usedCount));
            } else {
                setRemainingGenerations(MAX_GENERATIONS);
            }
        } catch (error) {
            console.error("Could not read from localStorage", error);
            setRemainingGenerations(MAX_GENERATIONS);
        }
    }, []);

    const processImageGeneration = useCallback(async (imageDataUrl: string, preset: Preset, selectedGender: Gender) => {
        const deskBounds = deskRef.current?.getBoundingClientRect();
        const deskWidth = deskBounds?.width || window.innerWidth * 0.6;
        const deskHeight = deskBounds?.height || window.innerHeight;
        const cardWidth = 288; // from sm:w-72
        const cardHeight = cardWidth / (4 / 5);

        const randomX = Math.floor(Math.random() * Math.max(0, deskWidth - cardWidth));
        const randomY = Math.floor(Math.random() * Math.max(0, deskHeight - cardHeight));
        const randomRotate = (Math.random() - 0.5) * 12;

        setGeneratedImages(prev => {
            const existing = prev[preset.name];
            const position = existing?.position || { x: randomX, y: randomY, rotate: randomRotate };
            return {
                ...prev,
                [preset.name]: {
                    ...existing,
                    status: 'pending',
                    position,
                },
            };
        });

        try {
            const generatedImageUrl = await generateThemedImage(imageDataUrl, preset.prompt, preset.name, selectedGender);
            setGeneratedImages(prev => ({
                ...prev,
                [preset.name]: { ...prev[preset.name]!, status: 'done', url: generatedImageUrl },
            }));
        } catch (err) {
            const error = err as Error;
            console.error(`Failed to generate image for theme "${preset.name}":`, error);
            setGeneratedImages(prev => ({
                ...prev,
                [preset.name]: { ...prev[preset.name]!, status: 'error', error: error.message },
            }));
        }
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setOriginalImageName(file.name.split('.').slice(0, -1).join('.') || 'image_originale');
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setOriginalImage(result);
                setGeneratedImages({});
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };

    const handleSelectPreset = (preset: Preset) => {
        const isAnyGenerationPending = Object.values(generatedImages).some(img => img.status === 'pending');

        if (originalImage && gender && generatedImages[preset.name]?.status !== 'pending' && !isAnyGenerationPending) {
            if (remainingGenerations <= 0) {
                alert("Vous avez atteint la limite de 5 générations pour cette démo.");
                return;
            }
            setRemainingGenerations(prev => {
                const newRemaining = prev - 1;
                try {
                    const currentUsed = parseInt(localStorage.getItem(USAGE_COUNT_KEY) || '0', 10);
                    localStorage.setItem(USAGE_COUNT_KEY, String(currentUsed + 1));
                } catch (error) {
                    console.error("Could not write to localStorage", error);
                }
                return newRemaining;
            });
            processImageGeneration(originalImage, preset, gender);
        }
    };

    const handleReset = () => {
        setOriginalImage(null);
        setOriginalImageName(null);
        setGeneratedImages({});
        setGender(null);
        setCustomName('');
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleDownloadImage = (imageUrl: string, fileName: string) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDeleteImage = (themeNameToDelete: string) => {
        setGeneratedImages(prev => {
            const newImages = { ...prev };
            delete newImages[themeNameToDelete];
            return newImages;
        });
        setZoomedCard(null);
    };

    const handleDownloadAlbum = async () => {
        setIsAlbumDownloading(true);
        try {
            const zip = new JSZip();
            const imagesToZip: { name: string; data: string }[] = [];
            const filePrefix = (customName.trim() || originalImageName || 'TonProfilIA').replace(/\s/g, '_');


            if (originalImage) {
                const mimeType = originalImage.match(/^data:(image\/\w+);base64,/)?.[1];
                const extension = mimeType?.split('/')[1] || 'png';
                const originalFileName = `original_${originalImageName}.${extension}`;
                imagesToZip.push({ name: originalFileName, data: originalImage.split(',')[1] });
            }

            Object.entries(generatedImages).forEach(([themeName, result]) => {
                if (result.status === 'done' && result.url) {
                    const preset = allPresets.find(p => p.name === themeName);
                    const displayName = preset ? getPresetDisplayName(preset, gender) : themeName;
                    const fileName = `${filePrefix}-${displayName.replace(/\s/g, '_')}.png`;
                    imagesToZip.push({ name: fileName, data: result.url.split(',')[1] });
                }
            });

            if (imagesToZip.length < 2) {
                alert("Générez au moins une image avant de créer un album.");
                return;
            }
            
            imagesToZip.forEach(img => zip.file(img.name, img.data, { base64: true }));

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(zipBlob);
            link.download = `${filePrefix}-Album.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);

        } catch (error) {
            console.error("Failed to create or download zip album:", error);
            alert("Une erreur est survenue lors de la création de l'album.");
        } finally {
            setIsAlbumDownloading(false);
        }
    };
    
    const successfulGenerations = Object.values(generatedImages).filter(img => img.status === 'done').length;
    const isAnyGenerationPending = Object.values(generatedImages).some(img => img.status === 'pending');
    const isGenerationDisabled = remainingGenerations <= 0 || isAnyGenerationPending;

    const zoomedPreset = zoomedCard ? allPresets.find(p => p.name === zoomedCard.themeName) : null;
    const zoomedDisplayName = zoomedPreset ? getPresetDisplayName(zoomedPreset, gender) : (zoomedCard?.themeName || '');

    const filePrefix = (customName.trim() || originalImageName || 'TonProfilIA').replace(/\s/g, '_');


    return (
        <div className="min-h-screen text-amber-50 font-roboto relative overflow-hidden flex flex-col">
            <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 pt-24 pb-32">
                <AnimatePresence mode="wait">
                    {!originalImage ? (
                        <motion.div
                            key="upload-view"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center text-center max-w-2xl"
                        >
                            <Logo />
                            
                            <GenderSelector selectedGender={gender} onSelectGender={setGender} />
                            
                            <div className="mt-6 w-full max-w-sm">
                                <label htmlFor="customName" className="block text-stone-300 mb-2 text-center">
                                    Nom pour vos créations (optionnel) :
                                </label>
                                <input
                                    type="text"
                                    id="customName"
                                    value={customName}
                                    onChange={(e) => setCustomName(e.target.value)}
                                    placeholder="Ex: Marie, MonProfil..."
                                    className="w-full bg-stone-800/50 border border-stone-600 rounded-md px-4 py-3 text-amber-50 text-center placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
                                    aria-label="Nom pour vos créations (optionnel)"
                                />
                            </div>

                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" className="hidden" aria-label="Télécharger une image" />
                            <button 
                                onClick={triggerFileUpload} 
                                disabled={!gender}
                                className="font-permanent-marker text-2xl text-center text-black bg-amber-400 py-4 px-10 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:-rotate-2 hover:bg-amber-300 shadow-[4px_4px_0px_2px_rgba(20,10,0,0.2)] mt-8 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:-rotate-0 disabled:bg-stone-600 disabled:shadow-none"
                            >
                                {gender ? 'Téléchargez votre photo' : 'Choisissez d\'abord un genre'}
                            </button>
                            <p className="text-stone-400 mt-6 max-w-md">
                                Choisissez une photo de portrait claire où votre visage est bien visible. Le modèle d'IA fonctionnera mieux avec une image de haute qualité.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div key="results-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full">
                            <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                                <div className="lg:col-span-1 lg:sticky lg:top-8 flex flex-col gap-8">
                                    <DraggableCardContainer>
                                        <DraggableCardBody className="p-0 w-full max-w-sm mx-auto aspect-[4/5]">
                                            <PolaroidCard imageUrl={originalImage} themeName="Votre Photo Originale" status="done" />
                                        </DraggableCardBody>
                                    </DraggableCardContainer>
                                    
                                    <PresetSelector categories={CATEGORIES} onSelectPreset={handleSelectPreset} generatedImages={generatedImages} isDisabled={isGenerationDisabled} gender={gender} />

                                    <div className="bg-stone-900/60 backdrop-blur-md rounded-lg border border-amber-900/60 p-4 flex flex-col gap-3">
                                        <button onClick={handleDownloadAlbum} disabled={isAlbumDownloading || successfulGenerations === 0} className="w-full font-permanent-marker text-lg text-center text-black bg-amber-400 py-3 px-6 rounded-sm transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-stone-500 disabled:hover:scale-100">
                                            {isAlbumDownloading ? 'Création...' : `Télécharger l'Album ZIP (${successfulGenerations})`}
                                        </button>
                                        <button onClick={handleReset} disabled={isAnyGenerationPending} className="w-full text-center text-amber-100 bg-stone-800/70 py-2 px-6 rounded-md transition-colors hover:bg-stone-700/90 disabled:opacity-50 disabled:cursor-not-allowed">
                                            {isAnyGenerationPending ? 'Génération en cours...' : 'Changer de photo'}
                                        </button>
                                    </div>
                                </div>

                                <div className="lg:col-span-2 min-h-[60vh] lg:min-h-screen relative" ref={deskRef}>
                                    <AnimatePresence>
                                        {Object.entries(generatedImages).map(([themeName, image]) => {
                                            const preset = allPresets.find(p => p.name === themeName);
                                            const displayName = preset ? getPresetDisplayName(preset, gender) : themeName;
                                            return (
                                                <motion.div
                                                    key={themeName}
                                                    initial={{ opacity: 0, scale: 0.8, y: image.position.y + 50, x: image.position.x, rotate: image.position.rotate }}
                                                    animate={{ opacity: 1, scale: 1, y: image.position.y, x: image.position.x, rotate: image.position.rotate }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ type: 'spring' }}
                                                    className="absolute"
                                                >
                                                    <DraggableCardContainer className="z-10">
                                                        <DraggableCardBody 
                                                            dragConstraintsRef={deskRef} 
                                                            className="p-0 w-64 sm:w-72 aspect-[4/5]"
                                                            onClick={() => {
                                                                if (image.status === 'done' && image.url) {
                                                                    setZoomedCard({ url: image.url, themeName });
                                                                }
                                                            }}
                                                        >
                                                            <PolaroidCard
                                                                imageUrl={image.url ?? null}
                                                                themeName={displayName}
                                                                status={image.status}
                                                                error={image.error}
                                                                onDownload={(url, theme) => handleDownloadImage(url, `${filePrefix}-${theme.replace(/\s/g, '_')}.png`)}
                                                            />
                                                        </DraggableCardBody>
                                                    </DraggableCardContainer>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                    {Object.keys(generatedImages).length === 0 && (
                                        <div className="absolute inset-0 flex items-center justify-center text-stone-400 text-center p-8 pointer-events-none">
                                            <p className="text-lg">Votre bureau est prêt.<br/>Cliquez sur un style à gauche pour commencer à créer !</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
            <Footer onInfoClick={() => setIsInfoModalOpen(true)} />
            <AnimatePresence>
                {zoomedCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setZoomedCard(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-3xl cursor-default flex flex-col gap-4"
                        >
                            <div className="w-full aspect-[4/5]">
                                <PolaroidCard
                                    imageUrl={zoomedCard.url}
                                    themeName={zoomedDisplayName}
                                    status="done"
                                />
                            </div>
                             <div className="flex items-center justify-center gap-4">
                                <button
                                    onClick={() => handleDownloadImage(zoomedCard.url, `${filePrefix}-${zoomedDisplayName.replace(/\s/g, '_')}.png`)}
                                    className="flex items-center gap-2 px-4 py-2 bg-stone-700/80 text-white rounded-md hover:bg-stone-600/90 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Télécharger
                                </button>
                                <button
                                    onClick={() => handleDeleteImage(zoomedCard.themeName)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-900/80 text-white rounded-md hover:bg-red-800/90 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                    </svg>
                                    Supprimer
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isInfoModalOpen && (
                    <InfoModal onClose={() => setIsInfoModalOpen(false)} remainingGenerations={remainingGenerations} />
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;