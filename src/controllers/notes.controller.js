export class NotesController {
    constructor( notesService ) {
        this.notesService = notesService; 
        this.createNote = this.createNote.bind(this);
        this.getNotes = this.getNotes.bind(this);
        this.searchByKeyword = this.searchByKeyword.bind(this);
        this.deletePoint = this.deletePoint.bind(this);
    }

    async createNote(req, res, next){
        try{    
            const { text, keywords } = req.body;
            const note = await this.notesService.createNote({text, keywords});
            return res.status(201).json(note);
        }catch(err){
            next(err);   
        }
    }

    async getNotes(req, res, next){
        try{
            const notes = await this.notesService.getAllNotes();
            return res.status(200).json(notes);
        }catch(err){
            next(err);
        }
    }

    async searchByKeyword(req, res, next){
        try{
            const rawKeywords = req.body?.keywords ?? req.body?.query ?? "";
            let parsedKeywords = [];

            if (Array.isArray(rawKeywords)) {
                parsedKeywords = rawKeywords
                    .map(k => String(k).trim().toLowerCase())
                    .filter(Boolean);
            } else if (typeof rawKeywords === 'string') {
                parsedKeywords = rawKeywords
                    .split(/[\s,]+/)
                    .map(k => k.trim().toLowerCase())
                    .filter(Boolean);
            }

            const notes = await this.notesService.searchByKeyword(parsedKeywords);
            return res.status(200).json(notes);
        }catch(err){
            next(err);
        }
    }

    async deletePoint(req, res, next){
        try{
            const { id } = req.params;
            const deleted = await this.notesService.deletePoint(id);

            return res.status(200).json({ success: true, id, result: deleted });
        }catch(err){
            next(err);
        }
    }
}