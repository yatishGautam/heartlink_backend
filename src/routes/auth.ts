import express, { Request, Response, NextFunction } from "express";
import {
	createUser,
	login,
} from "../Authentication/Controller/AuthenticaitonController";

const router = express.Router();

router.post("/signup", (req: Request, res: Response, next: NextFunction) => {
	try {
		createUser(req, res, next);
	} catch (error) {
		next(error);
	}
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
	try {
		login(req, res, next);
	} catch (error) {
		next(error);
	}
});

router.post("/logout", (req: Request, res: Response) => {
	// logout method
	res.send();
});

export default router;
