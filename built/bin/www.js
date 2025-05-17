#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const logger_1 = __importDefault(require("../lib/logger"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const Ssl_1 = require("./../infrastructure/config/Ssl");
let port = normalizePort(process.env.PORT || '3000');
let ssl = new Ssl_1.SslConfig();
let sslConfig = ssl.getSslConfig();
let server;
let options;
app_1.default.set('port', port);
if (process.env.PORT !== "443") {
    logger_1.default.debug("Connecting on port " + process.env.PORT);
    server = http_1.default.createServer(app_1.default);
}
else {
    logger_1.default.debug("Connecting on port " + process.env.PORT);
    let tempEncoding = { encoding: (process.env.SSL_UTF || 'utf8') };
    if (sslConfig.ca && sslConfig.ca !== '') {
        options = {
            key: fs_1.default.readFileSync(sslConfig.key, tempEncoding),
            cert: fs_1.default.readFileSync(sslConfig.cert, tempEncoding),
            ca: fs_1.default.readFileSync(sslConfig.ca, tempEncoding),
            dhparam: fs_1.default.readFileSync(sslConfig.dhparam, tempEncoding)
        },
            server = https_1.default.createServer(options, app_1.default);
    }
    else {
        options = {
            key: fs_1.default.readFileSync(sslConfig.key, tempEncoding),
            cert: fs_1.default.readFileSync(sslConfig.cert, tempEncoding),
            dhparam: fs_1.default.readFileSync(sslConfig.dhparam, tempEncoding)
        },
            server = https_1.default.createServer(options, app_1.default);
    }
}
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr?.port;
    logger_1.default.debug(`Server is up and running @ http://localhost:${port}`);
}
