import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { Login } = useContext(AuthContext);

  const router = useNavigate();

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userData.email && userData.password) {
      const response = await axios.post("http://localhost:8000/login", {
        userData,
      });
      // console.log(response.data);

      if (response.data.success) {
        const users = response.data.user;
        const tokens = response.data.token;
        await Login(users, tokens);

        setUserData({ email: "", password: "" });

        router("/");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error("All fields are mandatory");
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <form onSubmit={handleSubmit}>
        <fieldset
          style={{
            width: "380px",
            marginTop: "50px",
            textAlign: "centre",
            backgroundImage:
              "linear-gradient(to bottom right, #ff9933, #ff1a1a)",
          }}
        >
          {/* <legend>Login</legend> */}
          <label>Email:</label>
          <br />
          <input
            style={{
              width: "380px",
              marginTop: "10px",
              height: "30px",
              marginBottom: "10px",
              textAlign: "centre",
            }}
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <br />
          <label>Password:</label>
          <br />
          <input
            style={{
              width: "380px",
              marginTop: "10px",
              height: "30px",
              textAlign: "centre",
            }}
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <br />
          <input
            style={{
              marginLeft: "145px",
              marginTop: "15px",
              backgroundColor: " #ccff66",
              fontWeight: "700",
              border: "2px solid  #ccff66",
              //   color: "white",
              padding: "8px 35px",
              borderRadius: "20px",
            }}
            type="submit"
            value="Login"
          />
          <p
            style={{ marginLeft: "125px", color: "white" }}
            onClick={() => router("/register")}
          >
            <u>New user? Register</u>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
