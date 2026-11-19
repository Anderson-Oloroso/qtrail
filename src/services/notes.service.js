import { AppError } from "../utils/app-error.js";
import crypto from "node:crypto";
export class NotesService{
    constructor( embeddingService, notesRepository ){
        this.embeddingService = embeddingService;
        this.notesRepository = notesRepository;
    }

    async createNote({ text, keywords = []}){
        if(!text) throw new AppError('El texto es inválido o está vacío', 400);

        const vector = await this.embeddingService.generate(text);
        const id = crypto.randomUUID();

        const payload = {
            text,
            keywords,
            createdAt: new Date().toISOString()
        }

        await this.notesRepository.createPoint(id, vector, payload);
        return {
            id,
            ... payload
        }
    }
}