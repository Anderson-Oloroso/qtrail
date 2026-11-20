import { QdrantClient } from "@qdrant/js-client-rest";
import { envConfig } from "./env.js";

export const qdrantClient = new QdrantClient({
    url: envConfig.qdrantUrl,
    apiKey: envConfig.qdrantApiKey,
});

export const QDRANT_COLLECTION = envConfig.qdrantCollection;