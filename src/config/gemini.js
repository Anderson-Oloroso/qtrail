import { GoogleGenAI } from "@google/genai";
import { envConfig } from "./env.js";

export const gemini = new GoogleGenAI ({
    apiKey: envConfig.geminiApiKey,
});