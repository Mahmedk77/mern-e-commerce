import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

import { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } from "../config/env.config.js";

const createToken = (id) => {
    return jwt.sign({id}, JWT_SECRET)
        
}

// Controller for User SignIn
export const loginUser = async (req, res) => {


    try {
    const {email, password} = req.body;
    console.log("email", email);
    const user = await User.findOne({email});

    if(!user){
        return res.status(409).json({success: false, message:"User doesn't exist"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(409).json({success:false, message: "Password is incorrect"});
    }

    const token = createToken(user._id);
    res.status(201).json({
        success: true, 
        data:{
            user, 
            token
    }});

    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
}

// Controller for User SignUp
export const registerUser = async (req, res) => {
    
    try {

    const {name, email, password} = req.body;
    const exists = await User.findOne({email});

    if(exists){
        return res.status(409).json({success: false, message: "Email already exists"});
    }

    //validating email format
    if(!validator.isEmail(email)){
        return res.status(409).json({success: false, message: "Please enter a valid email"});
    }
    if(password.length < 8){
        return res.status(409).json({success: false, message: "Please enter a strong password"});
    }   
    
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creates a new instance of the User model
    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });
    
    // Saves the new user document into the MongoDB database.
    const user = await newUser.save()
    const token = createToken(user._id);
   

    res.status(201).json({
        data: {user, token}, 
        success: true
    });

    } catch (error) {
        console.log(error);
        
        res.json({
            success: false,
            message: error.message
        }); 
    }
}

//Controller for Admin SignIn
export const adminLogin = async (req, res) => {

    try {   
        const { email, password } = req.body;

        if( !(email === ADMIN_EMAIL && password === ADMIN_PASSWORD) ){
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }
        
        const token = jwt.sign(email+password, JWT_SECRET );
        
        res.status(200).json({success: true, token});

        
        
    } catch (error) {
        console.log(error);
        
        res.json({
            success: false,
            message: "helloworld"
        });
        
    }

}