import mongoose from "mongoose";
import { DB_URI } from "./env.config.js";

if(!DB_URI){
    throw new Error("DB_URI not found!")
}

const connectToDataBase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected to database in dev mode");
        

    } catch (error) {
        console.log("Error connecting to Database", error);
        
        process.exit(1);
    }
}

export default connectToDataBase;