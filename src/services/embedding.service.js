import { AppError } from "../utils/app-error.js";
import { gemini } from "../config/gemini.js"

export class EmbeddingService {
    constructor(AI = gemini){
        this.AI = AI;
    }

    async generate( text ){
        try{
            const response =  await this.AI.models.embedContent({
                model:'gemini-embedding-001',
                contents: text
            });

            return response.embeddings[0].values;
        }catch(err){
            throw new AppError(`Ocurrió un error en la generación del embedding: ${err.message}`);
        }
    }
}
