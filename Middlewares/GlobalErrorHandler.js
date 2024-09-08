// globalErrorHandler.js

const globalErrorHandler = (err, req, res, next) => {
	// Log the error stack trace for debugging (you may want to disable this in production)
	console.error(err.stack);

	// Handle specific errors
	if (err.name === "ValidationError") {
		return res.status(400).json({
			status: "fail",
			message: err.message,
			details: err.errors, // Additional details about the validation error
		});
	}

	if (err.name === "MongoError" && err.code === 11000) {
		// Duplicate key error in MongoDB (e.g., duplicate email)
		return res.status(400).json({
			status: "fail",
			message: "Duplicate field value entered",
			field: err.keyValue,
		});
	}

	if (err.name === "CastError") {
		// Handle invalid MongoDB object ID
		return res.status(400).json({
			status: "fail",
			message: `Invalid ${err.path}: ${err.value}`,
		});
	}

	// Handle SyntaxError for invalid JSON payload
	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		return res.status(400).json({
			status: "fail",
			message: "Invalid JSON payload",
		});
	}

	// Default to 500 for server errors
	res.status(err.status || 500).json({
		status: "error",
		message: err.message || "Internal Server Error",
	});
};

module.exports = globalErrorHandler;
