import {v2 as cloudinary} from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY, CLOUDINARY_NAME } from './env.config.js';

const connectToCloud = async () => {
    try {
        
        cloudinary.config({
            cloud_name: CLOUDINARY_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_SECRET_KEY
        })

        await cloudinary.api.ping();
        console.log("Connected to Cloudinary in dev mode");
        
        
    } catch (error) {
        
        console.log("Error Connecting to Cloudinary", error);
        process.exit(1);
        
    }
}

export default connectToCloud;
