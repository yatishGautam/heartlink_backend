import mongoose from "mongoose";

// Define the connectDB function
const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONOGOURI || "", {
			dbName: "heartsync",
		});

		console.log(`MongoDB Connected: ${connection.connection.host}`);
	} catch (error: any) {
		console.error(`Error: ${error.message}`);
		process.exit(1); // Exit process with failure
	}
};

// Export the connectDB function
export default connectDB;
