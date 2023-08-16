import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./Modals/User.modal.js";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Working...");
});

app.post("/login", function (req, res) {
  res.send("Hello from Login function..");
});

app.post("/register", async function (req, res) {
  console.log(req.body, "req.body");
  const { name, surname, age, email, number, password, confirmPassword } =
    req.body;
  if (!name) return res.send("Name is missing..");
  if (!surname) return res.send("Surname is missing..");
  if (!age) return res.send("Age is missing..");
  if (!email) return res.send("Email is required.");
  if (!number) return res.send("Number is required");
  if (!password) return res.send("Password is required");
  if (!confirmPassword) return res.send("Confirm password is required!");
  if (password !== confirmPassword)
    return res.send("Password and Confirm password not matched.");

  console.log(typeof age, typeof number, "data types");

  const user = new User({
    name: name,
    surname: surname,
    age: parseInt(age),
    email,
    number: parseInt(number),
    password,
  });

  // console.log(user,"user")

  await user.save();

  res.send("Registeration Done..");
});

app.get("/find",async(req,res)=>{
    const {email} = req.body;
    if(!email) return res.send("Email is required!")

    const user = await User.find ({email: email}).select("-password")
console.log(user, "user list here")
if(user.length){
    return res.send(user[0])
}
return res.send("No user found.")
})

app.patch("/update/:id", async(req,res)=>{
    const {age, number} = req.body;
    const {id} = req.params;

    if(!id) return res.send("id is required!")
    if(!age) return res.send("age is required!")
    if(!number) return res.send("number is required!")

    const updateUser = await User.findByIdAndUpdate(id,{age,number},{new : true}).select("-password")
    return res.json({message:"Data Updated!", data: updateUser})
})

app.put("/update/:id", async(req,res)=>{
    const {age, number} = req.body;
    const {id} = req.params;
 
    if(!id) return res.send("id is required!")
    if(!age) return res.send("age is required!")
    if(!number) return res.send("number is required!")

    const updateUser = await User.findByIdAndUpdate(id,{age,number},{new : true}).select("-password")
    return res.json({message:"Data Updated!", data: updateUser})
})

app.delete("/delete", async function(req,res){
    const{id}= req.query;
    if(!id)return res.send("Id is required!")

    const deleteUser = await User.findByIdAndDelete(id)
    return res.json({message:"User Deleted", data :"deleteUser"})
})



mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to DB..");
});

app.listen(8001, () => {
  console.log("Listening on port 8001");
});
