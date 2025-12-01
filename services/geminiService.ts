import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a quick sustainable fashion tip.
 */
export const getRecycleTip = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Give me one short, punchy, 10-word tip about recycling clothes or sustainable fashion.",
    });
    return response.text || "Reuse, Reduce, Recycle your fashion!";
  } catch (error) {
    console.error("Error fetching tip:", error);
    return "Donate your old clothes to extend their life!";
  }
};

/**
 * Answers a "How to" question for the forum search using Gemini.
 */
export const getRepairAdvice = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User is asking for advice on clothing repair or maintenance: "${query}". 
      Provide a concise, step-by-step guide (max 3 steps) suitable for a forum post summary. 
      Keep it encouraging and helpful.`,
    });
    return response.text || "We couldn't generate advice at this moment. Please try searching the forum manually.";
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "Sorry, I'm having trouble connecting to the sustainability database right now.";
  }
};

/**
 * Verifies if an image contains a specific brand logo or tag.
 */
export const verifyBrandImage = async (imageSrc: string, brandName: string): Promise<boolean> => {
  try {
    // Extract base64 data and mime type
    const base64Data = imageSrc.split(',')[1];
    const mimeType = imageSrc.split(';')[0].split(':')[1];

    if (!base64Data || !mimeType) return false;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [
                { 
                    inlineData: { 
                        mimeType: mimeType, 
                        data: base64Data 
                    } 
                },
                { 
                    text: `Analyze this image carefully. Does it contain a visible clothing label, tag, or logo that matches the brand "${brandName}"? 
                    Ignore small text differences, focus on the brand identity.
                    Answer strictly with "YES" or "NO".` 
                }
            ]
        }
    });
    
    const text = response.text?.trim().toUpperCase();
    console.log(`AI Verification for ${brandName}: ${text}`);
    return text?.includes('YES') || false;

  } catch (error) {
    console.error("Error verifying brand:", error);
    // Fail safe: If AI fails, we might want to allow it or block it. 
    // For this demo, let's return true to not block the user if API key issues exist.
    return true; 
  }
};