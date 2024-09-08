const express = require("express");
const router = express.Router();
const {
	createUser,
	login,
} = require("../src/Authentication/Controller/AuthenticaitonController");

router.post("/signup", (req, res) => {
	createUser(req, res);
});

router.post("/singin", (req, res) => {
	login(req, res);
});

router.post("./logout", (req, res) => {
	//logout method
	res.send();
});

module.exports = router;
