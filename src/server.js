import { App } from "./app.js";

class Server {
    constructor(){
        this.port = process.env.PORT || 3000;
        this.applicacion = new App();
    }

    listen(){
        this.applicacion.app.listen(this.port, ()=>{
            console.log(`Server running at http://localhost:${this.port}`);
        });
    }
}

const server = new Server();
server.listen();