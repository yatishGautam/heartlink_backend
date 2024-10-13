import { Router } from "express";

const router = Router();

const {
	createUser,
	login,
} = require("../src/Authentication/Controller/AuthenticaitonController");

router.post("/signup", (req, res, next) => {
	try {
		createUser(req, res, next);
	} catch (error) {
		next(error);
	}
});

router.post("/login", (req, res, next) => {
	try {
		login(req, res, next);
	} catch (error) {
		next(error);
	}
});

router.post("./logout", (req, res) => {
	//logout method
	res.send();
});

export default router;
