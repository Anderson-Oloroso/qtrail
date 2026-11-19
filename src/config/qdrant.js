import { QdrantClient } from "@qdrant/js-client-rest";
import { AppError } from "../utils/app-error.js";

if (!process.env.QDRANT_URL || !process.env.QDRANT_API_KEY){
    AppError('FALTA QDRANT_URL o QDRANR_API_KEY', 404);
}

export const collectionName = process.env.QDRANT_COLLECTION || 'qtrail';

export const qdrantClient = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
});