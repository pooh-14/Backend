import express from 'express';
import { Login, Register } from './Controllers/User.controller.js';
import mongoose from 'mongoose';

const app = express();

app.get("/", function (req, res){
    res.send("Working")
})

app.get("/login", Login)

// app.get("/login", function (req, res){
//     res.send("Login")
// })

app.get("/register", Register)

mongoose.connect("mongodb+srv://Omvetal:omvetal123@cluster0.lvroul6.mongodb.net/AWDIZ").then(()=>{
    console.log("Connected to db")
}).catch((error)=>{
    console.log("Error while connecting MongoDB", error)
})


app.listen(8000, ()=>{
    console.log("Server running on port 8000")
})