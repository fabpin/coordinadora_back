"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
exports.routers = [
    { path: '/', routes: index_1.default },
    { path: '/api/users', routes: users_1.default }
];
