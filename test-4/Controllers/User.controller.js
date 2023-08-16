import UserModal from "../Modals/User.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({
        status: "error",
        message: "All Feilds are Mandatory!",
      });

    const isEmailExist = await UserModal.find({ email: email });
    if (isEmailExist.length) {
      return res.json({
        status: "error",
        message: "Email already exists! Try a new one.",
      });
    }

    const hashPassW = await bcrypt.hash(password, 10);

    const user = new UserModal({ name, email, password: hashPassW });

    await user.save();

    return res.json({
      status: "Success",
      message: "User Registerd Successfully!",
    });
  } catch (error) {
    return res.json({ status: "error", message: "error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({
        status: "error",
        message: "All feilds are mandatory!",
      });

    const user = await UserModal.findOne({ email });
    if (!user) return res.json({ status: "error", message: "User not found!" });

    const isPasswordRight = await bcrypt.compare(password, user.password);
    console.log(isPasswordRight, "isPasswordRight");
    if (isPasswordRight) {
      const userObj = {
        name: user.name,
        email: user.email,
        _id: user._id,
      };

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET );
      console.log(token, "token here");
      return res.json({ status: "Success", message: "Login Successfull" ,user : userObj,token: token});
    }
    return res.json({ status: "error", message: "Password is Wrong!" });
  } catch (error) {
    return res.json({ status: "error", message: "error" });
  }
};
