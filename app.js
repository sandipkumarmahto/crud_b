import express from 'express'
import 'dotenv/config'
import connectDB from './src/db/dbconfig.js'
import userRouter from './src/route/user.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express()

app.use(cors())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extends:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
  
app.use("/user",userRouter)

 
app.get('/',(req,res) =>{
    res.send("home")
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT,() =>{
        console.log(`app listening of port ${process.env.PORT}`)
    })
})
.catch((err) =>{
    console.log("database connection failed")
})









 