import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWarmTips = async (): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 10 warm, romantic, and caring Christmas messages. 
      Each message MUST include an English version and a Chinese (Simplified) translation, separated by a newline character.
      Add a festive emoji (like 🎄 or ❄️) at the start.
      Example format: "🎄Merry Christmas!\n圣诞快乐！"
      Return ONLY the raw JSON array of strings. Do not use markdown blocks.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) return [];
    
    // Parse the JSON array
    const tips = JSON.parse(text);
    if (Array.isArray(tips)) {
      return tips.map(String);
    }
    return [];
  } catch (error) {
    console.error("Failed to generate tips:", error);
    return [];
  }
};
