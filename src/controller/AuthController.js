import { User } from "../model/user.model.js";

const generatAccessAndRefreshTokens = async(userId) => {
    try {
        const user=await User.findById(userId)
        const accessToken= await user.generateAccessToken()
        const refreshToken= await user.generateRefreshToken()
        user.refreshToken=refreshToken
        const user1=await user.save({ validateBeforeSave: false })
        return{refreshToken, accessToken}
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    console.log("in loginUSer controller")
    const {email, username, password}=req.body;
    if(!email || !password){
        res.status(400).json({message:"username or email is required"})
    }
    const user = await User.findOne({
        $or:[{username}, {email}]
    })
    // const user = await User.findOne({
    //     $or: [{username}, {email}]
    // })
    if(!user){
        res.status(404).json({message:"user not found"})
    }
   const isPasswordValid= await user.isPasswordCorrect(password)
   if(!isPasswordValid){
    res.status(401).json({message:"incorrect password"})
   }
   const {refreshToken,accessToken}= await generatAccessAndRefreshTokens(user._id)
   console.log(refreshToken)
   console.log(accessToken)
   const logggedInUSer=await User.findOne(user._id).select("-password -refreshToken")
   const options={
    httpOnly:true,
    secure:true
   }
   return res.status(200)
   .cookie("accessToken", accessToken, options)
   .cookie("refreshToken", refreshToken, options)
   .json({ user:logggedInUSer, accessToken, refreshToken, messgae:"user login successfully"  })
}

const logOutUser=async(req,res) =>{
    await User.findByIdAndUpdate(req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true
       }
    res.status(200).clearCookie(refreshToken).clearCookie(accessToken).json({message:"user logout successfully"})
}

export {loginUser, logOutUser};