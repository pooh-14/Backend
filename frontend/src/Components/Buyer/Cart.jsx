import React, { useContext, useEffect, useState } from "react";
import api from "../ApiConfig";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [finalprice, setFinalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const { state } = useContext(AuthContext);

  console.log(state, "state here");

  useEffect(() => {
    async function getCartProduct() {
      try {
        const response = await api.post("/all-cart-products", {
          userId: state?.user?._id,
        });
        if (response.data.success) {
          setCartProducts(response.data.cartProducts);
        }
      } catch (error) {
        console.log(error, "error in cart");
      }
    }
    if (state?.user?._id) {
      getCartProduct();
    }
  }, [state]);

  console.log(cartProducts, "cartProducts here");

  const checkOut = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token,"token here")
      if (token) {
        console.log(token,"token here")
      try {
        const response = await api.post("/checkOut", {token});
        // console.log(response.data.success,"response here");
        if (response.data.success) {
          toast.success(response.data.message);
          setCartProducts([]);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  // }

  useEffect(() => {
    if (cartProducts.length) {
      var totalprice = 0;
      for (var i = 0; i < cartProducts.length; i++) {
        totalprice += cartProducts[i].price;
      }
      setFinalPrice(totalprice);
    }
  }, [cartProducts]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        border: "2px solid black",
      }}
    >
      <div
        style={{
          width: "60%",
        }}
      >
        {cartProducts.map((cartpro) => (
          <div
            style={{
              width: "100%",
              height: "250px",
              border: "1px solid grey",
              padding: "10px",
              marginBottom: "10px",
              marginTop: "10px",
              display: "flex",
            }}
          >
            <div>
              <img
                style={{ width: "100%", height: "250px" }}
                src={cartpro.image}
              />
            </div>
            <div style={{ padding: "15px" }}>
              <h1>{cartpro.name}</h1>
              <h3>Price : {cartpro.price}</h3>
              <h3>Category : {cartpro.category}</h3>
              <button
                style={{
                  // marginLeft: "130px",
                  marginTop: "15px",
                  backgroundColor: " black",
                  fontWeight: "700",
                  border: "2px solid  black",
                  color: "white",
                  padding: "8px 35px",
                  borderRadius: "20px",
                }}
              >
                {" "}
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          width: "25%",
          height: "300px",
          border: "1px solid black",
          marginTop: "20px",
        }}
      >
        <h2 style={{ marginLeft: "20px" }}>Price Details</h2>
        <h3 style={{ marginLeft: "20px" }}>
          Total MRP : {finalprice + finalprice} $
        </h3>
        <h3 style={{ marginLeft: "20px" }}>
          Total MRP after discount : {finalprice} $
        </h3>
        <button
          style={{
            height: "45px",
            width: "200px",
            border: "1px solid green",
            backgroundColor: "green",
            color: "white",
            fontWeight: "700",
            marginLeft: "23%",
            fontSize: "17px",
            marginTop: "30px",
          }}
          onClick={checkOut}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
