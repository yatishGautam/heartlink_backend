import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import UserProfile from "./Model/UserProfile";
import { AuthenticatedRequest } from "../Middlewares/authentication";

// Controller to get user profile data
export const getProfileData = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.user?.id;

		const userProfile = await UserProfile.findOne({ userId });

		if (!userProfile) {
			return res.status(404).json({ message: "User profile not found" });
		}

		res.status(200).json(userProfile);
	} catch (error) {
		next(error);
	}
};

// Controller to update user profile data
export const updateProfileData = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	console.log("are we here ", req.user?.id);
	try {
		const userId = req.user?.id;
		const { bio, name, relationshipStatus } = req.body;

		if (!userId) {
			next();
		}
		console.log("are we here 2 ", req.user?.id);
		// Find the profile and update it
		const updatedProfile = await UserProfile.findOneAndUpdate(
			{ userId },
			{ bio, name, relationshipStatus },
			{ new: true, runValidators: true } // `new: true` returns the updated document
		);

		if (!updatedProfile) {
			// return res.status(404).json({ message: "User profile not found" });
		}

		// res.status(200).json(updatedProfile);
	} catch (error) {
		next(error);
	}
};
