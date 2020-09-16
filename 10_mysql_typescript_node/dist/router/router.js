"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_1 = __importDefault(require("../mysql/mysql"));
var router = express_1.Router();
router.get('/heroes', function (req, res) {
    var query = "\n        SELECT * FROM heroes\n    ";
    mysql_1.default.exec_query(query, function (err, heroes) {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }
        res.json({
            ok: true,
            heroes: heroes
        });
    });
});
router.get('/heroes/:id', function (req, res) {
    var id = req.params.id;
    // escapa probables errores en los values de entrada
    var scape = mysql_1.default.instance.connenction.escape(id);
    var query = "\n        SELECT * FROM heroes where id=" + id + "\n    ";
    mysql_1.default.exec_query(query, function (err, heroes) {
        if (err) {
            res.status(400).json({
                ok: false,
                err: err
            });
        }
        res.json({
            ok: true,
            heroes: heroes
        });
    });
});
exports.default = router;
