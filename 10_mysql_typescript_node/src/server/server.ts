import express = require('express');
import path = require('path');

export default class Server {
    public app: express.Application;
    public port:number;
    constructor(port:number){
        this.port = port;
        this.app = express();
    }
    // se usa static con la idea de solo llamr una sola instancia de
    // la clase Server
    static init(port:number){
        return new Server(port);
    }
    private publicFolder(){
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }
    start(){
        this.app.listen(this.port, ()=>{
            console.log('running on the port',this.port);
            this.publicFolder();
        });
    }
}