import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
	user?: any;
}

const authenticateMiddleware: RequestHandler = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;
	const jwtPassword = process.env.JWT_SECRET;

	if (!authHeader) {
		const error = new Error("Unauthorized. Token not provided") as any;
		error.status = 401;
		return next(error);
	}
	const token = authHeader.split(" ")[1];
	jwt.verify(token, jwtPassword as string, (err, user) => {
		if (err) {
			const error = new Error("Forbidden, invalid or expired token") as any;
			error.status = 403;
			return next(error);
		}
		req.user = user;
		next();
	});
};

export default authenticateMiddleware;
