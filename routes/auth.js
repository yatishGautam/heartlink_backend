const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
	//singup method
	console.log("singup");
	res.send("");
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
