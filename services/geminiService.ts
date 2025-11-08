
import { GoogleGenAI, Modality, GenerateContentResponse, Operation } from '@google/genai';
import { AspectRatio } from '../types';

// Utility to convert file to a base64 string
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};

const getGenAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Analyze Image (gemini-2.5-flash)
export const analyzeImage = async (imageFile: File): Promise<string> => {
    const ai = getGenAIClient();
    const model = 'gemini-2.5-flash';
    const base64Data = await fileToBase64(imageFile);

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: model,
        contents: {
            parts: [
                { text: "Describe this image in detail." },
                {
                    inlineData: {
                        mimeType: imageFile.type,
                        data: base64Data,
                    },
                },
            ],
        },
    });

    return response.text;
};

// Edit Image (gemini-2.5-flash-image)
export const editImage = async (imageFile: File, prompt: string): Promise<string> => {
    const ai = getGenAIClient();
    const model = 'gemini-2.5-flash-image';
    const base64Data = await fileToBase64(imageFile);

    const response = await ai.models.generateContent({
        model: model,
        contents: {
            parts: [
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: imageFile.type,
                    },
                },
                { text: prompt },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    const firstPart = response.candidates?.[0]?.content?.parts[0];
    if (firstPart && firstPart.inlineData) {
        return `data:${firstPart.inlineData.mimeType};base64,${firstPart.inlineData.data}`;
    }
    throw new Error("No image was generated. The prompt might be against the safety policy.");
};

// Generate Image (imagen-4.0-generate-001)
export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
    const ai = getGenAIClient();
    const model = 'imagen-4.0-generate-001';

    const response = await ai.models.generateImages({
        model: model,
        prompt: prompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: aspectRatio,
        },
    });
    
    const base64Image = response.generatedImages[0].image.imageBytes;
    if (base64Image) {
        return `data:image/png;base64,${base64Image}`;
    }
    throw new Error("Image generation failed.");
};


// Run Complex Query with Thinking Mode (gemini-2.5-pro)
export const runComplexQuery = async (prompt: string): Promise<string> => {
    const ai = getGenAIClient();
    const model = 'gemini-2.5-pro';

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            thinkingConfig: { thinkingBudget: 32768 },
        },
    });

    return response.text;
};

// Generate Video (veo-3.1-fast-generate-preview)
export const generateVideo = async (imageFile: File, prompt: string, aspectRatio: '16:9' | '9:16'): Promise<string> => {
    const ai = getGenAIClient(); // Get a fresh client to ensure latest API key is used
    const model = 'veo-3.1-fast-generate-preview';
    const base64Data = await fileToBase64(imageFile);

    let operation = await ai.models.generateVideos({
        model: model,
        prompt: prompt || 'Animate this image.',
        image: {
            imageBytes: base64Data,
            mimeType: imageFile.type,
        },
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: aspectRatio,
        }
    });

    // Polling for result
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (downloadLink) {
        // Fetch the video data as a blob
        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!videoResponse.ok) {
            throw new Error(`Failed to fetch video: ${videoResponse.statusText}`);
        }
        const videoBlob = await videoResponse.blob();
        return URL.createObjectURL(videoBlob);
    }
    
    throw new Error("Video generation failed to produce a valid link.");
};
