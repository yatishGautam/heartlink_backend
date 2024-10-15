import express, { Request, Response, NextFunction } from "express";
import { getProfileData, updateProfileData } from "../Profile/Controller";
import authenticateMiddleware from "../Middlewares/authentication";

const router = express.Router();

/* GET users listing. */
router.get(
	"/getprofiledata",
	(req: Request, res: Response, next: NextFunction) => {
		authenticateMiddleware(req, res, next);
		getProfileData(req, res, next);
	}
);

router.post(
	"/updateprofiledata",
	(req: Request, res: Response, next: NextFunction) => {
		authenticateMiddleware(req, res, next);
		updateProfileData(req, res, next);
	}
);

export default router;
