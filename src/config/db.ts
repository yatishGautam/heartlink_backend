import mongoose from "mongoose";

// Define the connectDB function
const connectDB = async (): Promise<void> => {
	try {
		const connection = await mongoose.connect(process.env.MONOGOURI as string, {
			dbName: "heartsync",
		});

		console.log(`MongoDB Connected: ${connection.connection.host}`);
	} catch (error) {
		console.error(`Error: ${(error as Error).message}`);
		process.exit(1); // Exit process with failure
	}
};

// Export the connectDB function
export default connectDB;
