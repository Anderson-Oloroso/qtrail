import { EmbeddingService } from "../services/embedding.service.js";
import { NotesRepository } from "../repositories/notes.repository.js";
import { NotesService } from "../services/notes.service.js";
import { NotesController } from "../controllers/notes.controller.js";
import { Router } from "express";
import { qdrantClient, QDRANT_COLLECTION } from "../config/qdrant.js"

const embeddingService = new EmbeddingService()
const notesRepository = new NotesRepository(qdrantClient, QDRANT_COLLECTION);
const notesService = new NotesService(embeddingService, notesRepository);
const notesController = new NotesController(notesService);

const notesRoter = Router();
notesRoter.post('/', notesController.createNote);
notesRoter.get('/', notesController.getNotes);
notesRoter.post('/search', notesController.searchByKeyword);
notesRoter.delete('/:id', notesController.deletePoint)

export default notesRoter;