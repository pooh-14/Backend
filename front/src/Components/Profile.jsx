import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import AuthProtected from "./Common/AuthProtected";
import api from "./ApiConfig";

const Profile = () => {
  const [number, setNumber] = useState();
  const [otp, setOtp] = useState();
  const [isNumberVerified, setIsNumberVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const { state } = useContext(AuthContext);

  const sendOtp = async () => {
    const response = await api.post("/send-otp", {
      userId: state?.user?._id,
    });
    if (response.data.success) {
      setIsOtpSent(true);
      toast.success("OTP sent! Please enter the verification code. ");
    }
  };

  const verifyOtp = async () => {
    if (otp) {
      try {
        const response = await api.post("/verify-otp", {
          userId: state?.user?._id,
          otp,
        });
        if (response.data.success) {
          setIsOtpSent(false);
          setIsNumberVerified(response.data.isNumberVerified);
          toast.success("Verification Successfull!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("OTP required");
    }
  };

  useEffect(() => {
    async function getNumber() {
      try {
        const response = await api.post("http://localhost:8000/get-number", {
          userId: state?.user?._id,
        });
        if (response.data.success) {
          // console.log(response.data, '--response.data');
          setNumber(response.data.number);
          setIsNumberVerified(response.data.isNumberVerified);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (state?.user?._id) {
      getNumber();
    }
  }, [state]);

  return (
    <AuthProtected>
      <div style={{ textAlign: "center" }}>
        <h1>Your Profile</h1>
        <h3>Verify Your Number : {number}</h3>
        {isNumberVerified ? (
          <h4 style={{ color: "green" }}>Your number is Verified!</h4>
        ) : (
          <button style={{
            // marginLeft: "145px",
            marginTop: "15px",
            backgroundColor: " #6a0b6e",
            fontWeight: "700",
            border: "2px solid  #6a0b6e",
              color: "white",
            padding: "8px 35px",
            borderRadius: "20px",
          }} onClick={sendOtp}>Get Verification Code</button>
        )}
        {isOtpSent && (
          <div>
            <input
              onChange={(event) => setOtp(event.target.value)}
              placeholder="Enter your OTP"
            />
            <br />
            <button
              style={{
                // marginLeft: "145px",
                marginTop: "15px",
                backgroundColor: " #e64302",
                fontWeight: "700",
                border: "2px solid  #e64302",
                  color: "white",
                padding: "8px 35px",
                borderRadius: "20px",
              }}
              onClick={verifyOtp}
            >
              Submit Otp
            </button>
          </div>
        )}
      </div>
    </AuthProtected>
  );
};

export default Profile;
