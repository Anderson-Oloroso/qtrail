export class NotesController {
    constructor( notesService ) {
        this.notesService = notesService; 
        this.createNote = this.createNote.bind(this);
        this.getNotes = this.getNotes.bind(this);
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
            const notes = await this.notesService.getNotes();
            return res.status(200).json(notes);
        }catch(err){
            next(err);
        }
    }
}