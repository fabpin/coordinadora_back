"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router({ caseSensitive: process.env.CASE_SENSITIVE === 'true' || false });
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
exports.default = router;
