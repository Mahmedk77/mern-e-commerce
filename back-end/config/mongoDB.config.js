import mongoose from "mongoose";

const connectToDataBase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 10000,
        });
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to Database:", error.message);
        throw error; // don't use process.exit() in serverless!
    }
}

export default connectToDataBase;