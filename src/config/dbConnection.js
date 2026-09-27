import mongoose from "mongoose"
import { config } from "./env.js"

const connectDB = async () => {
	try {
		await mongoose.connect(config.mongoURI)
		console.log("connected to MongoDB successfully")
	} catch (err) {
		console.error("MongoDB connection error:", err)
		process.exit(1)
	}
}

export default connectDB;
