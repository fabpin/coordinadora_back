"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../../interfaces/controllers/userController");
var router = express_1.default.Router({ caseSensitive: process.env.CASE_SENSITIVE === 'true' || false });
const validateCredentials_1 = require("../../../interfaces/validators/validateCredentials");
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/login', [validateCredentials_1.validationCredentials], userController_1.loginUser);
exports.default = router;
