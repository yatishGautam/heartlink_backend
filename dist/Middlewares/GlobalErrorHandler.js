const globalErrorHandler = (err, req, res, next) => {
    // Log the error stack trace for debugging (disable in production if needed)
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
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid JSON payload",
        });
    }
    // Default to 500 for server errors
    return res.status(err.status || 500).json({
        status: "error",
        message: err.message || "Internal Server Error",
    });
};
export default globalErrorHandler;
