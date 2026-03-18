import { config } from 'dotenv';

config(); // works locally, harmlessly does nothing on Vercel

export const DB_URI = process.env.DB_URI;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const JWT_SECRET = process.env.JWT_SECRET;
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const STRIPE_KEY = process.env.STRIPE_KEY;
export const PORT = process.env.PORT;