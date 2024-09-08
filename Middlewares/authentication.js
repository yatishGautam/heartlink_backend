const jwt = require("jsonwebtoken");

const jwtPassword = process.env.JWT_SECRET;

const authenticateMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, jwtPassword, (err, user) => {
			if (err) {
				return res
					.status(403)
					.json({ message: "forbidden, invalid or expired token" });
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
module.exports = authenticateMiddleware;
