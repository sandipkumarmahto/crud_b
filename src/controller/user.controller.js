import { User } from "../model/user.model.js";

const resisterUser= async (req,res) => {
    try {
        const {fullName, email, mobile, password } = req.body;
        const createdUser= await User.create({
            fullName,
            email,  
            mobile,
            password
        })
        if (!createdUser) {
            return res.status(500).json({ message: 'Failed register user' });
        }
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: createdUser._id,
                name: createdUser.fullName,
                mobile: createdUser.mobile,
                email: createdUser.email,
            },
        });
        console.log("user registered" + createdUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'something went wrong while registring the user'})
    }
}

const findUser =async (req, res) => {
    try {
        const { id } =req.params;
        const user=await User.findById(id);
        if(!user){
            res.status(404).json({message:"user not found"})
        }   
        // console.log(user)
        res.status(200).json(user);
    } catch (error) { 
        res.status(500).json({message:error.message})
        console.log(error)
    }
}

const findAllUsers= async (req,res) =>{
    try {
        const users=await User.find();
        if(!users){
            res.status(404).json({message:"user not found"})
        }
        console.log("all users are getting")
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error)
    }
}


const updateUser =async (req,res) => {
    try {
        const { id } =req.params;
        const updates=req.body;
        
        console.log('in update controller')
        console.log(id)
      
         
        const updatedUser= await User.findByIdAndUpdate(id,updates,
            {new:true});

        if(!updatedUser){
            res.status(404).json({message: "user not found"});
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message + "error in updating user"})
        console.log(error)
    }
}

const deleteUser= async (req,res) => {
    try {
        const { id }= req.params;
        console.log(id)
        console.log("in delete controller")
        const deleted =await User.findOneAndDelete(id);
        if(!deleted){
            res.status(404).json({message:"something wrong"})
        }
        res.status(200).json({message:"user deleted successfully"})
    
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error)
    }
}


export {resisterUser, findUser, findAllUsers, updateUser, deleteUser};