import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected successfully");
    } catch (error) {
        console.error("error while connecting to database: ", error);
    }
}

export default connectDB;
