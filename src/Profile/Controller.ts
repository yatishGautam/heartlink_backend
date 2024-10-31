import {
	Request,
	Response,
	NextFunction,
	ErrorRequestHandler,
	RequestHandler,
} from "express";
import UserProfile from "./Model/UserProfile";
import { AuthenticatedRequest } from "../Middlewares/authentication";

// Controller to get user profile data
export const getProfileData: RequestHandler = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.user?.id;

		const userProfile = await UserProfile.findOne({ userId });

		if (!userProfile) {
			const error = new Error("invalid user") as any;
			error.status = 404;
			throw error;
		}

		res.status(200).json(userProfile);
	} catch (error) {
		next(error);
	}
};

// Controller to update user profile data
export const updateProfileData: RequestHandler = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.user?.id;
		const { bio, name, relationshipStatus } = req.body;

		// If userId is not found, return early to prevent further execution
		if (!userId) {
			const error = new Error("Unauthorized") as any;
			error.status = 401;
			throw error;
		}

		// Try to find the existing profile
		let userProfile = await UserProfile.findOne({ userId });
		if (!userProfile) {
			userProfile = new UserProfile({ userId, bio, name, relationshipStatus });
		} else {
			// Edit existing records
			userProfile.bio = bio;
			userProfile.name = name;
			userProfile.relationshipStatus = relationshipStatus;
		}

		await userProfile.save();

		// Send response without returning it
		res.status(200).json(userProfile);
	} catch (error) {
		console.log("Error in saving profile data");
		next(error);
	}
};
