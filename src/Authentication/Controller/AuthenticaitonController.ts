import userModel from "../Model/userData";
import { Request, Response, NextFunction } from "express";
const bcCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = process.env.SALT_ROUNDS;
const jwtPassword = process.env.JWT_SECRET;

// @desc    Create a new user
// @route   POST /api/users
// @access  Public

const createUser = async (req: Request, res: Response, next: NextFunction) => {
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
		await userToSave.save();
		res.status(200).json({ message: `user ${user.name} saved` });
	} catch (error) {
		next(error);
	}
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "user not found" });
		}
		const isPasswordValid = await bcCrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "password is invalid" });
		}
		const token = jwt.sign({ id: user._id, email: user.email }, jwtPassword, {
			expiresIn: "1h",
		});

		res.status(200).json({
			message: "login successful",
			token,
		});
	} catch (error) {
		console.log("error in login:: ", error);
		next(error);
	}
};

module.exports = { createUser, login };
