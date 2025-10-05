import { GoogleGenAI } from "@google/genai";
import { RecognitionResult } from "@/dtos/anaylzeResponce.dtos";


export async function recognizeDrawing(base64Image: string): Promise<RecognitionResult> {
    try {
        if (!base64Image || typeof base64Image !== 'string') {
            throw new Error('Invalid base64 image data');
        }

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API
        
        if (!apiKey) {
            throw new Error('API key not configured');
        }

        const ai = new GoogleGenAI({ apiKey: apiKey });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: [
                {
                    inlineData: {
                        mimeType: 'image/png',
                        data: base64Image,
                    },
                },
                { text: "What is being drawn in this image? What object or character is this child drawing? Describe what you see in one word." }
            ],
        });

        return {
            success: true,
            text: response.text
        };
    } catch (error) {
        console.error('Error recognizing drawing:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}
