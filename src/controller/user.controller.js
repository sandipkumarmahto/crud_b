import { User } from "../model/user.model.js";
import { ApiError } from "../utilts/ApiError.js";
import { uploadOnCloudinary } from "../utilts/Cloudinary.js";

const resisterUser = async (req, res) => {
  // try {
    const { fullName, email, username, mobile, password } = req.body;
    const ps = password;
    console.log(fullName);
    console.log(email);
    console.log(username);
    console.log(mobile);
    console.log(password);
    if (fullName==="" || !email==="" || !username==="" || !password==="") {
      res.staus(400).json(new ApiError(400, "all fields are required"));
    }
 
    // if([fullName,email,username,password].some((field) =>{
    //     field?.trim()===""
    // })){
    //     return res.status(400).json({message:"all fields are required"})
    // }

    const existedUSer = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existedUSer) {
      console.log("username or email already exist");
      console.log(existedUSer);
      // return res.status(409).json({message:"username or email already exist"})
      throw new ApiError(409, "username or email already exist");
    }

    const avatartLocalPath=req.file?.path;
    if(!avatartLocalPath){
      throw new ApiError(400,"avatar file is required")
    }
    const avatar=await uploadOnCloudinary(avatartLocalPath)
    if(!avatar){
      throw new ApiError(400,"error in uploading")
    }

    const createdUser = await User.create({
      username,
      fullName, 
      email,
      mobile,
      avatar:avatar.url,
      password,
      ps,
    }); 

    if (!createdUser) {
      return res.status(500).json({ message: "Failed register user" });
    }
    res.status(201).json({
      message: "User registered successfully",
      user: createdUser
      // {
      //   id: createdUser._id,
      //   name: createdUser.fullName,
      //   mobile: createdUser.mobile,
      //   email: createdUser.email,
      // },
    });
    console.log("user registered" + createdUser);
  // } catch (error) {
  //   console.log(error);
  //   res
  //     .status(500)
  //     .json({ message: "something went wrong while registring the user" });
  // }
};

const findUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    // console.log(user)
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const findAllUsers = async (req, res) => {
  try {
    console.log("in the findall user constroller")
    const users = await User.find();
    if (!users) {
      res.status(404).json({ message: "user not found" });
    }
    console.log("all users are getting");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    console.log("in update controller");
    console.log(id);

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message + "error in updating user" });
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log("in delete controller");
    const deleted = await User.findOneAndDelete(id);
    if (!deleted) {
      res.status(404).json({ message: "something wrong" });
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export { resisterUser, findUser, findAllUsers, updateUser, deleteUser };
