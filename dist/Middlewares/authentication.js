"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const jwtPassword = process.env.JWT_SECRET;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, jwtPassword, (err, user) => {
            if (err) {
                return res
                    .status(403)
                    .json({ message: "Forbidden, invalid or expired token" });
            }
            req.user = user;
            next();
        });
    }
    else {
        return res
            .status(401)
            .json({ message: "Unauthorized. Token not provided" });
    }
};
exports.default = authenticateMiddleware;
