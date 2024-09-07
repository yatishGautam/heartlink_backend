const express = require("express");
const router = express.Router();
const {
	createUser,
} = require("../src/Authentication/Controller/AuthenticaitonController");

router.post("/signup", (req, res) => {
	createUser(req, res);
});

router.post("/singin", (req, resss) => {
	//singin method
	res.send("");
});

router.post("./logout", (req, res) => {
	//logout method
	res.send();
});

module.exports = router;
