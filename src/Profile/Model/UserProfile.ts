import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUserProfile extends Document {
	userId: mongoose.Types.ObjectId;
	bio?: string;
	name: string;
	relationshipStatus: string;
	createdAt?: Date;
	updatedAt?: Date;
}

// 2. Create the schema for the user profile
const UserProfileSchema: Schema<IUserProfile> = new Schema<IUserProfile>({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	bio: {
		type: String,
		maxlength: 500,
	},
	relationshipStatus: {
		type: String, // URL to the profile picture
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

// 3. Add pre-save middleware to handle the `updatedAt` field
UserProfileSchema.pre<IUserProfile>("save", function (next) {
	this.updatedAt = new Date();
	next();
});

// 4. Create the model
const UserProfile: Model<IUserProfile> = mongoose.model<IUserProfile>(
	"UserProfile",
	UserProfileSchema
);

// 5. Export the model for use in other parts of the application
export default UserProfile;
