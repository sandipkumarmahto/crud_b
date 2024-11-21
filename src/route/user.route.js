import { Router } from "express";
import { resisterUser, findUser, findAllUsers, updateUser,deleteUser } from "../controller/user.controller.js";

const router=Router()

router.get('/',(req,res) =>{
    res.send('user router home page')
})

router.post('/register',resisterUser)
router.get('/findUser/:id',findUser)
router.get('/findAll',findAllUsers)
router.put('/updateUser/:id',updateUser)
router.delete('/deleteUser/:id',deleteUser)


export default router;      