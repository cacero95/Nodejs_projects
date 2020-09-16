import mysql = require('mysql');


export default class Mysql {
    private static _instance:Mysql;
    connenction:mysql.Connection;
    status:boolean = false;
    constructor(){
        console.log('Class initialized');
        // el singleton evita que las conecciones se usen mas de una sola vez
        this.connenction = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'',
            database:'node_db'
        });
        this.connect_db();
    }
    public static get instance(){
        /**
         * con esta linea verifica si la instancia ya esta creada,
         * en caso de queno llama el constructor de la clase para,
         * inicializar la instancia de la dba, con el fin
         * de prevenir el llamado de la misma instancia
         * this is a singleton
         */
        return this._instance || (this._instance = new this());
    }
    static exec_query(query:string, callback:Function){
        this.instance.connenction.query(query,(err,results:Object[],fields)=>{
            if(err){
                console.log('bad query', err);
                callback(err);
                return;
            }
            if(results.length === 0){
                callback('El registro no existe');
            }
            callback(null, results);
        })
    }
    private connect_db(){
        this.connenction.connect((err:mysql.MysqlError)=>{
            if(err){
                console.log(err.message);
                return;
            }
            this.status = true;
            console.log('db online')
        })
    }
}