import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"E-Hospital-Management-System",
    }).then(()=>{
        console.log("The Database is connected succesfully");
    }).catch((err)=>{
        console.log(`There might be some error occured while connecting to the database: ${err}`);
    });
};