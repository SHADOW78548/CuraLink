import mongoose from "mongoose";
import validator from "validator";

const messageSchema=new mongoose.Schema({
    firstName:{
        type : String,
        required: true,
        minLenght: [3,"First Name must contain atleast 3 character!"],
    },
    lastName:{
        type : String,
        required: true,
        minLenght: [3,"Last Name must contain atleast 3 character!"],
    },
    email:{
        type:String,
        required:true,
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone Number must contain exact 10 digits !"],
        maxLength:[10,"Phone Number must contain 10 digits !"],
    },
    message:{
        type:String,
        required:true,
        minLenght:[10,"Message must contain atleast 10 characters !"],
    },
});

export const Message=mongoose.model("Message",messageSchema);