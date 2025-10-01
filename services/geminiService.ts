/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

type Gender = 'male' | 'female';
let ai: GoogleGenAI | null = null;

/**
 * Gets a memoized instance of the GoogleGenAI client.
 * @returns An initialized GoogleGenAI instance.
 */
function getAiClient(): GoogleGenAI {
    if (ai) {
        return ai;
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("La clé API Gemini est manquante. Assurez-vous que la variable d'environnement API_KEY est configurée.");
    }

    ai = new GoogleGenAI({ apiKey });
    return ai;
}


// --- Helper Functions ---

/**
 * Prepends a gender-specific sentence to the prompt.
 * @param prompt The original prompt.
 * @param gender The selected gender.
 * @returns The adapted prompt string.
 */
function adaptPromptForGender(prompt: string, gender: Gender): string {
    const genderTerm = gender === 'male' ? 'un homme' : 'une femme';
    
    // This phrasing clarifies that the gender is part of the *transformation instruction*, 
    // not a factual statement about the input image, which prevents conflicts with the model's analysis.
    // By adding "Instruction de modification d'image" and "Ne générez aucun texte...", we make the request
    // more direct and less prone to conversational text responses.
    return `Instruction de modification d'image : Transformez la personne sur la photo pour qu'elle corresponde à la description suivante. Le genre souhaité pour le résultat final est ${genderTerm}. Description : "${prompt}". Ne générez aucun texte, seulement l'image finale.`;
}


/**
 * Creates a fallback prompt to use when the primary one is blocked.
 * @param themeName The theme name (e.g., "Super-héros").
 * @param gender The selected gender.
 * @returns The fallback prompt string.
 */
function getFallbackPrompt(themeName: string, gender: Gender): string {
    const genderTerm = gender === 'male' ? 'un homme' : 'une femme';
    
    // This prompt is simple and direct. The addition of "Instruction de modification d'image" and 
    // "Ne générez aucun texte..." further reduces the risk of being blocked or misinterpreted.
    return `Instruction de modification d'image : Transformez la personne sur cette photo en ${themeName}. Le personnage créé doit être ${genderTerm}. L'image finale doit être une photographie photoréaliste de haute qualité. Ne générez aucun texte, seulement l'image finale.`;
}


/**
 * Processes the Gemini API response, extracting the image or throwing an error if none is found.
 * @param response The response from the generateContent call.
 * @returns A data URL string for the generated image.
 */
function processGeminiResponse(response: GenerateContentResponse): string {
    const imagePartFromResponse = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePartFromResponse?.inlineData) {
        const { mimeType, data } = imagePartFromResponse.inlineData;
        return `data:${mimeType};base64,${data}`;
    }

    const textResponse = response.text;
    console.error("API did not return an image. Response:", textResponse);
    throw new Error(`Le modèle d'IA a répondu avec du texte au lieu d'une image : "${textResponse || 'Aucune réponse textuelle reçue.'}"`);
}

/**
 * A wrapper for the Gemini API call that includes a retry mechanism for internal server errors and quota limits.
 * @param imagePart The image part of the request payload.
 * @param textPart The text part of the request payload.
 * @returns The GenerateContentResponse from the API.
 */
async function callGeminiWithRetry(imagePart: object, textPart: object): Promise<GenerateContentResponse> {
    const client = getAiClient();
    
    const maxRetries = 3;
    const initialDelay = 1000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await client.models.generateContent({
                model: 'gemini-2.5-flash-image-preview',
                contents: { parts: [imagePart, textPart] },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });
        } catch (error) {
            console.error(`Error calling Gemini API (Attempt ${attempt}/${maxRetries}):`, error);
            const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
            
            if (errorMessage.includes('API key not valid')) {
                throw new Error("Votre clé API Gemini n'est pas valide. Veuillez la vérifier.");
            }
            
            const isRateLimitError = errorMessage.includes('"code":429') || errorMessage.includes('RESOURCE_EXHAUSTED');
            if (isRateLimitError) {
                // Extraire le délai de retry de l'erreur si disponible
                const retryMatch = errorMessage.match(/retry in (\d+(?:\.\d+)?)s/);
                const retryDelay = retryMatch ? Math.ceil(parseFloat(retryMatch[1]) * 1000) : 60000; // 60s par défaut
                
                if (attempt < maxRetries) {
                    console.log(`Quota exceeded. Retrying in ${retryDelay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                    continue;
                } else {
                    throw new Error(`Quota d'utilisation dépassé. L'API Gemini indique d'attendre ${Math.ceil(retryDelay/1000)} secondes avant de réessayer. Veuillez patienter ou vérifier votre plan de facturation.`);
                }
            }

            const isInternalError = errorMessage.includes('"code":500') || errorMessage.includes('INTERNAL');

            if (isInternalError && attempt < maxRetries) {
                const delay = initialDelay * Math.pow(2, attempt - 1);
                console.log(`Internal error detected. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            throw error; // Re-throw if not a retriable error or if max retries are reached.
        }
    }
    // This should be unreachable due to the loop and throw logic above.
    throw new Error("Gemini API call failed after all retries.");
}


/**
 * Generates a theme-styled image from a source image and a prompt.
 * It includes a fallback mechanism for prompts that might be blocked.
 * @param imageDataUrl A data URL string of the source image (e.g., 'data:image/png;base64,...').
 * @param prompt The prompt to guide the image generation.
 * @param themeName The name of the theme for fallback purposes.
 * @param gender The selected gender of the person in the photo.
 * @returns A promise that resolves to a base64-encoded image data URL of the generated image.
 */
export async function generateThemedImage(imageDataUrl: string, prompt: string, themeName: string, gender: Gender): Promise<string> {
    const match = imageDataUrl.match(/^data:(image\/\w+);base64,(.*)$/);
    if (!match) {
        throw new Error("Invalid image data URL format. Expected 'data:image/...;base64,...'");
    }
    const [, mimeType, base64Data] = match;

    const imagePart = {
        inlineData: { mimeType, data: base64Data },
    };

    const isUserFriendlyError = (msg: string) => 
        msg.startsWith("Votre clé API Gemini n'est pas valide") || 
        msg.startsWith("Vous avez dépassé votre quota d'utilisation");

    const adaptedPrompt = adaptPromptForGender(prompt, gender);

    // --- First attempt with the adapted prompt ---
    try {
        console.log("Attempting generation with gender-adapted prompt...");
        const textPart = { text: adaptedPrompt };
        const response = await callGeminiWithRetry(imagePart, textPart);
        return processGeminiResponse(response);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
        const isNoImageError = errorMessage.includes("Le modèle d'IA a répondu avec du texte au lieu d'une image");

        if (isNoImageError) {
            console.warn("Original prompt was likely blocked. Trying a fallback prompt.");
            
            // --- Second attempt with the fallback prompt ---
            try {
                const fallbackPrompt = getFallbackPrompt(themeName, gender);
                console.log(`Attempting generation with fallback prompt for ${themeName}...`);
                const fallbackTextPart = { text: fallbackPrompt };
                const fallbackResponse = await callGeminiWithRetry(imagePart, fallbackTextPart);
                return processGeminiResponse(fallbackResponse);
            } catch (fallbackError) {
                console.error("Fallback prompt also failed.", fallbackError);
                const finalErrorMessage = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
                if (isUserFriendlyError(finalErrorMessage)) {
                    throw fallbackError; // Re-throw user-friendly error directly.
                }
                throw new Error(`Le modèle d'IA a échoué avec les deux prompts. Dernière erreur : ${finalErrorMessage}`);
            }
        } else {
            // This is for other errors, like an invalid API key or a final internal server error after retries.
            console.error("An unrecoverable error occurred during image generation.", error);
            if (isUserFriendlyError(errorMessage)) {
                throw error; // Re-throw user-friendly error directly.
            }
            throw new Error(`Le modèle d'IA n'a pas pu générer d'image. Détails : ${errorMessage}`);
        }
    }
}