import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing.");
  }
  return new GoogleGenAI({ apiKey: apiKey || 'dummy_key_for_build' });
};

/**
 * Analyzes the current canvas drawing.
 * @param base64Image The base64 string of the canvas (image/png).
 * @param prompt The user's question about the drawing.
 */
export const analyzeDrawing = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    const ai = getClient();
    // Extract just the base64 data part if it includes the prefix
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: base64Data
            }
          },
          {
            text: prompt || "Describe what is drawn in this image in detail."
          }
        ]
      }
    });

    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze drawing. Ensure API key is valid.");
  }
};

/**
 * Generates a background image based on a text prompt.
 * @param prompt Description of the image to generate.
 */
export const generateBackgroundImage = async (prompt: string): Promise<string> => {
  try {
    const ai = getClient();
    // Instructions: Use 'gemini-2.5-flash-image' for general generation.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
         parts: [{ text: prompt }]
      }
      // imageConfig is optional, defaults usually work fine.
    });

    // Iterate to find the image part
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response.");
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    throw new Error("Failed to generate image.");
  }
};
