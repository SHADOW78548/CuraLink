import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
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
    nic:{
        type:String,
        required:true,
        minLenght:[5,"NIC must contain atleast 5 characters !"],
        maxLength : [5,"NIC must contain atleast 5 character !"],
    },
    dob:{
        type:Date,
        required:[true,"DOB is required"],
    },
    gender:{
        type:String,
        required:true,
        enum:["Male","Female"],
    },
    password:{
        type:String,
        required:true,
        minLenght:[8,"Password must contain 8 characters"],
        select:false,
    },
    role:{
        type:String,
        required:true,
        enum:["Admin", "Doctor", "Patient"],
    },
    doctorDepartment:{
        type:String,
    },
    docAvatar:{
        public_id:String,
        url:String,
    }
});




userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn : process.env.JWT_EXPIRES,
    });
};

export const User =mongoose.model("User",userSchema);