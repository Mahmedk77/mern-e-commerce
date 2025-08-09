import jwt from 'jsonwebtoken';
import { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } from '../config/env.config.js';

export const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        
        if(!token){
            return res.json({success: false, message: "User is Not Authorized, Login Again"});
        }

        const token_decode = jwt.verify(token, JWT_SECRET);
        if(token_decode !== ADMIN_EMAIL+ADMIN_PASSWORD){
            return res.json({success: false, message: "User is Not Authorized, Login Again"});
        }

        next();
    
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
        
    }
}