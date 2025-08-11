import {config} from 'dotenv';

config();

export const {PORT, DB_URI, CLOUDINARY_NAME, CLOUDINARY_SECRET_KEY, 
    CLOUDINARY_API_KEY, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, STRIPE_KEY} = process.env