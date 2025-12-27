import {User} from '../models/userSchema.js';
import {catchAsyncErrors} from "./catchAsyncErrors.js";
import errorHandler from "errorhandler";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.adminToken;
    if(!token){
        return next (new errorHandler("Admin is Not Authenticated !",400));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);
    if(req.user.role !== "Admin"){
        return next (new errorHandler(`${req.user.role} not authorized for this resources !`,403));
    }
    next();
});

export const isPatientAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next (new errorHandler("Patient is Not Authenticated !",400));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);
    if(req.user.role !== "Patient"){
        return next (new errorHandler(`${req.user.role} not authorized for this resources !`,403));
    }
    next();
});