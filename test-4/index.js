import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  Login,
  Register,
  getCurrentUser,
} from "./Controllers/User.controller.js";
import {
  addComments,
  addProduct,
  addRating,
  allProduct,
  deleteYourProduct,
  getYourProducts,
  updateYourProduct,
} from "./Controllers/Product.controller.js";
import { addCart, getCartProducts } from "./Controllers/Buyers.controller.js";
import {
  blockProduct,
  blockUser,
  getAllBuyers,
  getAllProducts,
  getAllSellers,
  getBlockedProducts,
  getUnVerifiedProducts,
  getVerifiedProducts,
  unBlockProduct,
  unBlockUser,
  verifyProduct,
} from "./Controllers/Admin.controller.js";
import {
  checkSeller,
  isAdmin,
  isValidUser,
} from "./Middlewares/All.Middleware.js";
import cors from 'cors';

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working!");
});

app.post("/register", Register);

app.post("/login", Login);

app.post("/get-current-user", getCurrentUser);

app.post("/add-product", checkSeller, addProduct);

app.get("/all-products", allProduct);

app.get("/get-your-products", checkSeller, getYourProducts);

app.patch("/update-your-product", checkSeller, updateYourProduct);

app.post("/add-cart", addCart);

app.get("/get-cart-products", getCartProducts);

app.delete("/delete-your-product", checkSeller, deleteYourProduct);

app.patch("/block-user", isAdmin, blockUser);

app.patch("/un-block-user", isAdmin, unBlockUser);

app.patch("/block-product", isAdmin, blockProduct);

app.patch("/un-block-product", isAdmin, unBlockProduct);

app.patch("/verify-product", isAdmin, verifyProduct);

app.patch("/add-rating", isValidUser, addRating);

app.get("/get-all-buyers", isAdmin, getAllBuyers); // UserModel.find({role : "Buyer"}) - assignemnt
app.get("/get-all-sellers", isAdmin, getAllSellers); // UserModel.find({role : "Seller"}) - assignemnt
app.get("/get-all-products", isAdmin, getAllProducts); // ProductModel.find({}) - assignemnt

app.patch("/get-verify-product", isAdmin, getVerifiedProducts); //- assignemnt
app.patch("/get-un-verify-product", isAdmin, getUnVerifiedProducts); //- assignemnt
app.patch("/get-blocked-product", isAdmin, getBlockedProducts); //- assignemnt

app.patch("/add-comments", isValidUser, addComments); //- assignemnt - {userId comment}

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to DB!");
});

app.listen(8000, () => {
  console.log("Server running on port 8000!");
});
