import { Request, Response, NextFunction } from "express";

interface ErrorWithStatus extends Error {
	status?: number;
	errors?: any;
	keyValue?: any;
	code?: number;
	path?: string;
	value?: string;
}

// Global error handler middleware
const globalErrorHandler = (
	err: ErrorWithStatus,
	req: Request,
	res: Response,
	next: NextFunction
): Response<any> | void => {
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

export default globalErrorHandler;
