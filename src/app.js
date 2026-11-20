import express from 'express';
import notesRoter from './routes/notes.route.js';
import { ErrorHandler } from './middleware/error-handler.js';

export class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
        this.errorHandling();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/health', (req, res)=>{
            res.status(200).json({ status: 'ok' });
        });

        this.app.use('/api/notes', notesRoter);
    }

    errorHandling(){
        const errorHandler = new ErrorHandler();
        this.app.use(errorHandler.handle.bind(errorHandler));
    }
    
    getExpressInstance(){
        return this.app;
    }
}