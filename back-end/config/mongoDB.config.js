import mongoose from "mongoose";

const connectToDataBase = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("DB already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.DB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 10000,
        });
        console.log("Connected to database!");
    } catch (error) {
        console.error("DB Connection failed:", error.message);
    }
}

export default connectToDataBase;