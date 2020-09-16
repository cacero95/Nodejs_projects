"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port;
        this.app = express();
    }
    // se usa static con la idea de solo llamr una sola instancia de
    // la clase Server
    Server.init = function (port) {
        return new Server(port);
    };
    Server.prototype.publicFolder = function () {
        var publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log('running on the port', _this.port);
            _this.publicFolder();
        });
    };
    return Server;
}());
exports.default = Server;
