import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";


export const verifyJWT = async(req,res,next) =>{
try {
        const token= req.cookies?.accessToken || req.header(Authorization)?.replace("Bearer ","")
    
        if(!token){
            res.status(401).json({message:"unauthorized request"})
        }
    
        const decodedToken=jwt.verify(token,proces.env.ACCESS_TOKEN_SECRET)
    
        const user=await User.findById(decodedToken._id).select("-password -refreshToken")
    
        if(!user){
            res.status(401).json({message:"invalid access token"})
        }
        req.user= user;
        next()
} catch (error) {
    res.status(401).json({message:"invalid access token"})
    console.log(error)
}
}