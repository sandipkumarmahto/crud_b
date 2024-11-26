import { Router } from "express";
import { resisterUser, findUser, findAllUsers, updateUser,deleteUser } from "../controller/user.controller.js";
import { loginUser, logOutUser } from "../controller/AuthController.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router=Router()

router.get('/',(req,res) =>{
    res.send('user router home page')
})

router.post('/register',resisterUser)
router.get('/findUser/:id',findUser)
router.get('/findAll',findAllUsers)
router.put('/updateUser/:id',updateUser)
router.delete('/deleteUser/:id',deleteUser)

router.post('/login',loginUser)
router.post('/logout',verifyJWT,logOutUser)

export default router;      