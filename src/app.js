import express from 'express';
import notesRoter from './routes/notes.route.js';
import { ErrorHandler } from './middleware/error-handler.js';

export class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    routes(){
        this.app.get('/', (req, res)=>{
            res.status(200).json({ message: 'API QTrail funcionando ...'});
        });

        this.app.get('/health', (req, res)=>{
            res.status(200).json({ status: 'ok' });
        });

        this.app.use('/api/notes', notesRoter);
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.static('public'));

        const errorHandler = new ErrorHandler();
        this.app.use(errorHandler.handle.bind(errorHandler));
    }
    
    getExpressInstance(){
        return this.app;
    }
}