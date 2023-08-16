import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  Login,
  Register,
  getCurrentUser,
} from "./Controllers/User.controller.js";
import { addProduct } from "./Controllers/Product.controller.js";
import { checkSeller } from "./Middlewares/Seller.Middleware.js";

const app = express();
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Working!");
});

app.post("/register", Register);

app.post("/login", Login);

app.post("/get-current-user", getCurrentUser);

app.post("/add-product", checkSeller, addProduct);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to DB!");
});

app.listen(8000, () => {
  console.log("Server running on port 8000!");
});
