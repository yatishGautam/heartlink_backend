const userModel = require("../Model/userData");
const bcCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = process.env.SALT_ROUNDS;
const jwtPassword = process.env.JWT_SECRET;

// @desc    Create a new user
// @route   POST /api/users
// @access  Public

const createUser = async (req, res) => {
	try {
		let user = {
			name: req.body.name,
			password: req.body.password,
			email: req.body.email,
		};
		const hashedPassword = await bcCrypt.hash(
			user.password,
			Number(SALT_ROUNDS)
		);
		user.password = hashedPassword;
		const userToSave = new userModel(user);
		userToSave.save();
		res.status(200).json({ message: `user ${user.name} saved` });
	} catch (e) {
		console.error("error in creating user :", e);
		res.status(400).json({ message: "cannot save the model" });
	}
};

const login = async (req, res) => {
	try {
	} catch (error) {
		console.log("error while logging in ", error);
		res.status(400).json({ message: "error while loggin in " });
	}
};

module.exports = { createUser, login };
