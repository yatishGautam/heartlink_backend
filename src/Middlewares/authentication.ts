import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const jwtPassword = process.env.JWT_SECRET || "";
// This is a middleware that checks the JWT being passed from the user and verifys it and makes sure that user object is avialable for use in future subsequent requests.
const authenticateMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, jwtPassword, (err, user) => {
			if (err) {
				return res
					.status(403)
					.json({ message: "forbidden, invalid or expired token" });
			}
			res.locals.user = user;
			next();
		});
	} else {
		return res
			.status(401)
			.json({ message: "Unauthorized. Token not provided" });
	}
};
export default authenticateMiddleware;
