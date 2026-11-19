import { GoogleGenAI } from "@google/genai";
import { AppError } from "../utils/app-error.js";

if(!process.env.GEMINI_API_KEY){
    AppError('Falta la Api Key de Gemini', 404);
}

export const gemini = new GoogleGenAI ({
    apiKey: process.env.GEMINI_API_KEY,
});