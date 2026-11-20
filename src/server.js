import { App } from "./app.js";
import { envConfig } from "./config/env.js";

class Server {
    constructor(){
        this.port = envConfig.port;
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