import { AppError } from "../utils/app-error.js";
import crypto from "node:crypto";
export class NotesService{
    constructor( embeddingService, notesRepository ){
        this.embeddingService = embeddingService;
        this.notesRepository = notesRepository;
    }

    async createNote({ text, keywords = []}){
        if(!text) throw new AppError('[SERVICE:NOTES] El contenido de la nota es obligatorio y no puede estar vacío', 400, 'INVALID_NOTE_TEXT');

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

    async getAllNotes(){
        const points = await this.notesRepository.findAll();

        return points.map(point =>({
            id: point.id,
            ...point.payload
        }));
    }

    async searchByKeyword(keywords = []){
        if(!Array.isArray(keywords) ||  keywords.length === 0) return [];
        const searched = await this.notesRepository.searchByKeyword(keywords);

        return searched.map(point =>({
            id: point.id,
            ...point.payload
        }));
    }

    async deletePoint(id){
        if(!id) return null;

        const isDeleted = await this.notesRepository.deletePoint(id);
        return isDeleted;
    }
}