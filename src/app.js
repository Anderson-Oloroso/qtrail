import express from 'express';

export class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.get('/', (req, res)=>{
            res.status(200).json({ message: 'API QTrail funcionando ...'});
        });

        this.app.get('/health', (req, res)=>{
            res.status(200).json({ status: 'ok' });
        });
    }

    getExpressInstance(){
        return this.app;
    }
}