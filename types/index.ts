/**
 * types/index.ts
 * Définitions des types TypeScript pour l'application Profil IA
 */

export type ImageStatus = 'pending' | 'done' | 'error';
export type Gender = 'male' | 'female';

export interface GeneratedImage {
    status: ImageStatus;
    url?: string;
    error?: string;
    position: { x: number; y: number; rotate: number };
}

export interface ApiError {
    message: string;
    code?: number;
    status?: string;
}

export interface FileUploadEvent extends Event {
    target: HTMLInputElement & {
        files: FileList;
    };
}

export interface ZoomedCard {
    url: string;
    themeName: string;
}

export interface ImageDownloadData {
    name: string;
    data: string;
}

export interface DeskBounds {
    width: number;
    height: number;
}