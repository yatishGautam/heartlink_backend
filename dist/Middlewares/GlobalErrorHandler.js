"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, // Use 'any' here for flexibility
req, res, next) => {
    // Log the error stack trace for debugging
    console.error(err.stack);
    // Handle specific errors
    if (err.name === "ValidationError") {
        return res.status(400).json({
            status: "fail",
            message: err.message,
            details: err.errors,
        });
    }
    if (err.name === "MongoError" && err.code === 11000) {
        return res.status(400).json({
            status: "fail",
            message: "Duplicate field value entered",
            field: err.keyValue,
        });
    }
    if (err.name === "CastError") {
        return res.status(400).json({
            status: "fail",
            message: `Invalid ${err.path}: ${err.value}`,
        });
    }
    // Safely check if err is a SyntaxError and has status
    if (err instanceof SyntaxError &&
        "status" in err &&
        err.status === 400 &&
        "body" in err) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid JSON payload",
        });
    }
    // Default to 500 for server errors, check if 'status' exists
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        status: "error",
        message: err.message || "Internal Server Error",
    });
};
exports.default = globalErrorHandler;
