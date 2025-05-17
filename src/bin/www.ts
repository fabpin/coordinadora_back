#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import Logger from "../lib/logger";
import http from 'http';
import https from 'https';
import fs from 'fs';
import { SslConfig } from './../infrastructure/config/Ssl';

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '3000');
let ssl = new SslConfig();
let sslConfig  = ssl.getSslConfig();
let server : any;
let options: any;

app.set('port', port);

/**
 * Create HTTP server.
 */

if (process.env.PORT !== "443") {
    Logger.debug("Connecting on port " + process.env.PORT);
    server = http.createServer(app);
} else {
    Logger.debug("Connecting on port " + process.env.PORT);
    let tempEncoding:any = { encoding: (process.env.SSL_UTF || 'utf8') };
    if (sslConfig.ca && sslConfig.ca !== '') {
        options = {
            key: fs.readFileSync(sslConfig.key, tempEncoding),
            cert: fs.readFileSync(sslConfig.cert, tempEncoding),
            ca: fs.readFileSync(sslConfig.ca, tempEncoding),
            dhparam: fs.readFileSync(sslConfig.dhparam, tempEncoding)
        },
            server = https.createServer(options, app);
    } else {
        options = {
            key: fs.readFileSync(sslConfig.key, tempEncoding),
            cert: fs.readFileSync(sslConfig.cert, tempEncoding),
            dhparam: fs.readFileSync(sslConfig.dhparam, tempEncoding)
        },
            server = https.createServer(options, app);
    }
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val:any) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error:any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr?.port;
    Logger.debug(`Server is up and running @ http://localhost:${port}`);
}
