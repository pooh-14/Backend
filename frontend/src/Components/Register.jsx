import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../Context/AuthContext'


const Register = () => {

  const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer" })

  const { state } = useContext(AuthContext)
  const router = useNavigate()

  const handleChange = (event) => {
      setUserData({ ...userData, [event.target.name]: event.target.value })
  }
  const selectRole = (event) => {
      setUserData({ ...userData, "role": event.target.value })
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (userData.name && userData.email && userData.password && userData.confirmPassword && userData.role) {
          if (userData.password === userData.confirmPassword) {
              const response = await axios.post("http://localhost:8000/register", { userData });
              if (response.data.success) {
                  setUserData({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer" })
                  router('/login')
                  toast.success(response.data.message)
              } else {
                  toast.error(response.data.message)
              }

          } else {
              toast.error("Password and Confirm Password not Matched.")
          }
      } else {
          toast.error("All fields are mandtory.")
      }
  }
  // console.log(userData, "userData")

  useEffect(() => {
      if (state?.user?.name) {
          router('/')
      }
  }, [state])

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
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
              <label>Select Role :</label>
    
              <select
                style={{
                  width: "380px",
                  marginTop: "10px",
                  height: "30px",
                  marginBottom: "10px",
                  textAlign: "centre",
                }}
                onChange={selectRole}
              >
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
              </select>
              <br />
    
              <label>Name:</label>
              <br />
              <input
                style={{
                  width: "380px",
                  marginTop: "10px",
                  height: "30px",
                  marginBottom: "10px",
                  textAlign: "centre",
                }}
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
              <br />
    
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
                  marginBottom: "10px",
                  textAlign: "centre",
                }}
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
              <br />
              <label>Confirm Password:</label>
              <br />
              <input
                style={{
                  width: "380px",
                  marginTop: "10px",
                  height: "30px",
                  marginBottom: "10px",
                  textAlign: "centre",
                }}
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
              <br />
              <input
                style={{
                  marginLeft: "130px",
                  marginTop: "15px",
                  backgroundColor: " #ccff66",
                  fontWeight: "700",
                  border: "2px solid  #ccff66",
                  //   color: "white",
                  padding: "8px 35px",
                  borderRadius: "20px",
                }}
                type="submit"
                value="Register"
              />
              <p
                style={{ marginLeft: "80px", color: "white" }}
                onClick={() => router("/practicelogin")}
              >
                <u>Already have an account?Login</u>
              </p>
            </fieldset>
          </form>
        </div>
      );
}

export default Register