import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
	user?: any;
}

const authenticateMiddleware = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;
	const jwtPassword = process.env.JWT_SECRET;

	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, jwtPassword as string, (err, user) => {
			if (err) {
				return res
					.status(403)
					.json({ message: "Forbidden, invalid or expired token" });
			}
			req.user = user;
			next();
		});
	} else {
		return res
			.status(401)
			.json({ message: "Unauthorized. Token not provided" });
	}
};

export default authenticateMiddleware;
