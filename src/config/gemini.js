import { GoogleGenAI } from "@google/genai";
import { AppError } from "../utils/app-error.js";
import { envConfig } from "./env.js.";

if(!process.env.GEMINI_API_KEY){
    throw new AppError('Falta la Api Key de Gemini', 404);
}

export const gemini = new GoogleGenAI ({
    apiKey: envConfig.GEMINI_API_KEY,
});