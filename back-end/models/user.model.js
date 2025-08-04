import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    cartData:{
        type: Object,
        default: {}
    }

}, {timestamp: true, minmize: false});

const User = mongoose.models.User || mongoose.model('User', userSchema);
//userModel = mongoose.model("user")
export default User;