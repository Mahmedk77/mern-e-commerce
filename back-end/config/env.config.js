import {config} from 'dotenv';

config();

export const {PORT, DB_URI, CLOUDINARY_NAME, CLOUDINARY_SECRET_KEY, CLOUDINARY_API_KEY, JWT_SECRET} = process.env