import mongoose from "mongoose";

const connectToDataBase = async () => {
    console.log("Attempting DB connection...");
    console.log("URI prefix:", process.env.DB_URI?.substring(0, 30));
    
    try {
        await mongoose.connect(process.env.DB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 10000,
        });
        console.log("Connected to database!");
    } catch (error) {
        console.error("DB Connection failed:", error.message);
        throw error;
    }
}

export default connectToDataBase;