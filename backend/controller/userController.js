import {catchAsyncErrors} from '../middleware/catchAsyncErrors.js';
import errorHandler from '../middleware/errorMiddleware.js'; 
import {User} from '../models/userSchema.js';
import {generateToken} from '../utils/jwtToken.js';
import cloudinary from "cloudinary";


export const patientRegister= catchAsyncErrors(async(req,res,next)=>{
     const {firstName, lastName, email,phone, password, gender, dob, nic, role } = req.body;

     if(! firstName || ! lastName || ! email || ! phone || ! password || ! gender || ! dob || ! nic || ! role){
      return res.status(400).json({
         success:false,
         message:"Please fill the form correctly!",
     });
      //   return next(new ErrorHandler("Please Fill the Full Form !",400));
     }

     let  user =await User.findOne({email});
     if(user){
      return res.status(400).json({
         success:false,
         message:"Please fill the form correctly!",
     });
      //   return next(new ErrorHandler("User Already Registered !",400));
     }

     user = await User.create({firstName, lastName, email, phone, password, gender, dob, nic, role});

     generateToken(user," User Registered SuccesFully !", 200, res);
   //   res.status(200).json({
   //      success : true,
   //      message : "User Registered Succesfully !",
   //   });
});

export const login =catchAsyncErrors(async(req,res,next)=>{
   const {email,password,confirmPassword, role} =req.body;
   if(!email || !password || !confirmPassword || !role){
      return next(new errorHandler("Please Provide All Details !",400));
   }
   if(password!==confirmPassword){
      return next(new errorHandler("Password dosen't match ! Please Try Again !",400));
   }
   const user = await User.findOne({email}).select("+password");
   if(!user){
      return next(new errorHandler("Invalid Password or Email!",400));
   }
   const isPasswordMatched = await user.comparePassword(password);
   if(!isPasswordMatched){
      return next(new errorHandler("Invalid Password or Email!",400));
   }
   if(role !==user.role){
      return next(new errorHandler("User with this role not found !",400));
   }
   // res.status(200).json({
   //    success : true,
   //    message : "User Logged in SuccesFully !",
   // });
   generateToken(user," User Logged In SuccesFully !", 200, res);

});

export const addNewAdmin=catchAsyncErrors(async(req,res,next)=>{
   const {firstName, lastName, email,phone, password, gender, dob, nic } = req.body;

   if(! firstName || ! lastName || ! email || ! phone || ! password || ! gender || ! dob || ! nic ){
   return next(new errorHandler("Please Fill the Full Form !",400));
   }
   const isRegistered = await User.findOne({email});
   if(isRegistered){
      return next(new errorHandler(`${isRegistered.role} with this Email already Exists !`));
   }
   const admin =await User.create({firstName, lastName, email,phone, password, gender, dob, nic, role:"Admin",});
   
   res.status(200).json({
      success : true,
      message : "New Admin Registered SuccessFully !",
   });

});
export const getAllDoctors = catchAsyncErrors(async(req,res,next)=>{
   const doctors = await User.find({role:"Doctor"});
   res.status(200).json({
      success:true,
      doctors,
   });
});

export const getUserDetails = catchAsyncErrors(async(req,res,next)=>{
   const user = req.user;
   res.status(200).json({
      success:true,
      user,
   });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
   res
     .status(200)
   .cookie("adminToken", "", {
       httpOnly: true,
       expires: new Date(Date.now()),
     })
     .json({
       success: true,
       message: "Admin Logged Out Successfully !",
     });
 });

 export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
   res
     .status(201)
     .cookie("patientToken", "", {
       httpOnly: true,
       expires: new Date(Date.now()),
     })
     .json({
       success: true,
       message: "Patient Logged Out Successfully !",
     });
 });
 

 export const addNewDoctor = catchAsyncErrors(async(req,res,next)=>{
   if(!req.files || Object.keys(req.files).length === 0){
      return next(new errorHandler("Doctor Avatar Required !",400));
   }
   const {docAvatar}=req.files;
   const allowedFormats=["image/png","image/jpeg","image/webp","image/jpg"];
   if(!allowedFormats.includes(docAvatar.mimetype)){
      return next(new errorHandler("File format not Supported !!",400));
   }
   const {firstName,lastName,email, phone,password,gender, dob, nic,doctorDepartment}=req.body;
   if(!firstName || !lastName ||!email || !phone || !password || !gender || !dob || !nic || !doctorDepartment){
      return next(new errorHandler("Please Fill All the Data Carefully !!",400));
   }
   const isRegistered=await User.findOne({email});
   if(isRegistered){
      return next(new errorHandler(`${isRegistered.role} is already registered with this email !!`,400));
   }
   const cloudinaryResponse=await cloudinary.uploader.upload(docAvatar.tempFilePath);
   if(!cloudinaryResponse || cloudinaryResponse.error){
      console.error("cloudinary Erorr : "+cloudinaryResponse.error || "Unknown Cloudinary Error !");
   }
   const doctor= await User.create({firstName,lastName,email, phone,password,gender, dob, nic,doctorDepartment,role:"Doctor",docAvatar:{

      public_id : cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
   },});
   res.status(200).json({
      success: true,
      message : "New Doctor Registered SuccessFully !!",
      doctor
   });
 });