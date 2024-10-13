#!/usr/bin/env node

import app from "./app.js"; // ES6 import
import debug from "debug";
import http from "http";

// Initialize debug with the namespace
const debugLog = debug("heartsync:server");

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 * @param val The port value to normalize
 * @returns The normalized port or false
 */
function normalizePort(val: string) {
	const port = parseInt(val, 10);
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
 * @param error The error object
 */
function onError(error: any) {
	if (error.syscall !== "listen") {
		throw error;
	}
	const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

	// Handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(`${bind} is already in use`);
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
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
	debugLog(`Listening on ${bind}`);
}
