// import { JsonWebTokenError } from "jsonwebtoken";

class errorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}

export const errormiddleware=(err,req,res,next)=>{
    err.message=err.message || "Internal Server Down !";
    err.statusCode=err.statusCode || 500;

    if(err.code===11000){
        const message=`Duplicate ${object.keys(err.keyValue)}.Entered`;
        err=new errorHandler(message, 400);
    }
    if(err.name=== "JsonWebTokenError"){
        const message="Json Web Token Invalid !, Please Try Again !";
        err=new errorHandler(message, 400);
    }
    if(err.name==="TokenExpiredError"){
        const message="Json Web Token Expired !, Try Again !";
        err =new errorHandler(message,400);
    }
    if(err.name==="CastError"){
        const message=`Invalid ${err.path}`;
        err=new errorHandler(message,400);
    }


const errorMessage=err.errors ? Object.values(err.errors).map(error=>error.message).join(" ") : err.message;

    return res.status(err.statusCode).json({
        success:false,
        message:errorMessage,
    });
};

export default errorHandler;