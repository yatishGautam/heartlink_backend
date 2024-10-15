import { Request, Response, NextFunction } from "express";
import userModel from "../Model/userData"; // Ensure that userModel is exported as a default export in the userData model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import ErrorWithStatus from "../../types/global";

// Type definitions for environment variables
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = {
			name: req.body.name as string,
			password: req.body.password as string,
			email: req.body.email as string,
		};

		console.log(user);

		const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
		user.password = hashedPassword;

		const userToSave = new userModel(user);
		await userToSave.save();

		res.status(200).json({ message: `User ${user.name} saved` });
	} catch (error: unknown) {
		next(error);
	}
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body as { email: string; password: string };
		const jwtPassword = process.env.JWT_SECRET || "default_jwt_secret";
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Password is invalid" });
		}

		const token = jwt.sign({ id: user._id, email: user.email }, jwtPassword, {
			expiresIn: "1h",
		});

		res.status(200).json({
			message: "Login successful",
			token,
		});
	} catch (error: unknown) {
		next(error);
	}
};
