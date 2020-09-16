"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var Mysql = /** @class */ (function () {
    function Mysql() {
        this.status = false;
        console.log('Class initialized');
        // el singleton evita que las conecciones se usen mas de una sola vez
        this.connenction = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'node_db'
        });
        this.connect_db();
    }
    Object.defineProperty(Mysql, "instance", {
        get: function () {
            /**
             * con esta linea verifica si la instancia ya esta creada,
             * en caso de queno llama el constructor de la clase para,
             * inicializar la instancia de la dba, con el fin
             * de prevenir el llamado de la misma instancia
             * this is a singleton
             */
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    Mysql.exec_query = function (query, callback) {
        this.instance.connenction.query(query, function (err, results, fields) {
            if (err) {
                console.log('bad query', err);
                callback(err);
                return;
            }
            if (results.length === 0) {
                callback('El registro no existe');
            }
            callback(null, results);
        });
    };
    Mysql.prototype.connect_db = function () {
        var _this = this;
        this.connenction.connect(function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
            _this.status = true;
            console.log('db online');
        });
    };
    return Mysql;
}());
exports.default = Mysql;
