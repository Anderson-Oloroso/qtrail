import { raw } from "express";
import { AppError } from "../utils/app-error.js";

export class EnvConfig {
    static REQUIRED_VARS = ['GEMINI_API_KEY', 'QDRANT_URL', 'QDRANT_API_KEY'];

    constructor( envSource = process.env ){
        this.#validate(envSource);
        
        this.nodeEnv = envSource.NODE_ENV?.trim() || 'development';
        this.port = this.#parsePort(envSource.PORT, 3000);
        this.geminiApiKey = envSource.GEMINI_API_KEY.trim();
        this.qdrantUrl = envSource.QDRANT_URL.trim();
        this.qdrantApiKey = envSource.QDRANT_API_KEY.trim();
        this.qdrantCollection = envSource.QDRANT_COLLECTION?.trim() || 'qtrail';

        Object.freeze(this);
    } 

    #validate(envSource){
        const missing = EnvConfig.REQUIRED_VARS.filter((key) => {
            const value = envSource?.[key];
            return typeof value !== 'string'|| value.trim() === '';
        });

        if(missing.length > 0){
            throw new AppError(`Faltan variables de entorno obligatorias: ${missing.join(", ")}. Revisa tu archivo .env.`, 500);
        }
    }

    #parsePort(rawPort, fallback){
        if(rawPort === undefined || rawPort === null || String(rawPort).trim() === ''){
            return fallback;
        }

        const parsed = Number(rawPort);
        if(!Number.isInteger(parsed) || parsed <= 0 || parsed > 65536){
            throw new AppError(`Configuración inválida en PORT: "${rawPort}". Debe ser un puerto entre 1 y 65535.`, 500)
        }

        return parsed;
    }

    isProduction(){
        return this.nodeEnv === 'production';
    }
}

export const envConfig = new EnvConfig();