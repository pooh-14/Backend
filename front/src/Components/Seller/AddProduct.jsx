import SellerProtected from "../Common/SellerProtected";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import api from "../ApiConfig";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  const { state } = useContext(AuthContext);
  const router = useNavigate();

  const handleChange = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      productData.name &&
      productData.price &&
      productData.image &&
      productData.category
    ) {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await api.post("/add-product", {
          token,
          productData,
        });
        if (response.data.success) {
          setProductData({ name: "", price: "", image: "", category: "" });
          router("/yourproduct");
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("All fields are mandtory.");
    }
  };
  // console.log(productData, "productData")

  return (
    <SellerProtected>
      <h1 style={{ textAlign: "center" }}>Add Product</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit}>
          <fieldset
            style={{
              width: "380px",
              marginTop: "10px",
              textAlign: "centre",
              backgroundImage:
                "linear-gradient(to bottom right, #8000ff, #ff00ff)",
            }}
          >
            {/* <legend>Fill your Details</legend> */}
            <label>Product Name:</label>
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
              value={productData.name}
              onChange={handleChange}
            />
            <br />

            <label>Product Price :</label>
            <br />
            <input
              style={{
                width: "380px",
                marginTop: "10px",
                height: "30px",
                marginBottom: "10px",
                textAlign: "centre",
              }}
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
            <br />
            <label>Product Image :</label>
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
              name="image"
              value={productData.image}
              onChange={handleChange}
            />
            <br />
            <label>Product Category :</label>
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
              name="category"
              value={productData.category}
              onChange={handleChange}
            />
            {/* <select
              style={{
                width: "380px",
                marginTop: "10px",
                height: "30px",
                marginBottom: "10px",
                textAlign: "centre",
              }}
              onChange={selectRole}
            >
              <option value="Other">Other</option>
              <option value="Mens">Mens</option>
              <option value="Womens">Womens</option>
              <option value="Kids">Kids</option>
              <option value="Electronics">Electronics</option>
            </select>
            <br /> */}

            <input
              style={{
                marginLeft: "130px",
                marginTop: "15px",
                backgroundColor: " black",
                fontWeight: "700",
                border: "2px solid  #ccff66",
                color: "white",
                padding: "8px 35px",
                borderRadius: "20px",
              }}
              type="submit"
              value="Add Product"
            />
            <br />
            {/* <button
              style={{
                marginLeft: "130px",
                marginTop: "15px",
                backgroundColor: " black",
                fontWeight: "700",
                border: "2px solid  #ccff66",
                color: "white",
                padding: "8px 35px",
                borderRadius: "20px",
              }}
              onClick={() => router("/your-products")}
            >
              All Products
            </button> */}
          </fieldset>
        </form>
      </div>
    </SellerProtected>
  );
};

export default AddProduct;
