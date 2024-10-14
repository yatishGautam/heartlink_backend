import mongoose, { Document, Model, Schema } from "mongoose";

// Define an interface for the User document
interface IUser extends Document {
	name: string;
	email: string;
	password: string;
}

// Define the schema
const userSchema: Schema<IUser> = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// Define the model
const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

// Export the model
export default userModel;
