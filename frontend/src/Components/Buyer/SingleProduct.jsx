import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";
import api from "../ApiConfig";

const SingleProduct = () => {
  const { id } = useParams();
  const { state } = useContext(AuthContext);
  const [singleProductData, setSingleProductData] = useState({});

  useEffect(() => {
    if (id) {
        async function getSingleProductData() {
            try {
                const response = await api.post('/get-single-product-data', { productId: id })
                if (response.data.success) {
                    setSingleProductData(response.data.product)
                }
            } catch (error) {

            }
        }
        getSingleProductData()
    }
}, [id])

  console.log(singleProductData, "singleProductData");

  async function addToCart(productId) {
    try {
      const response = await api.post("/add-to-cart", {
        productId,
        userId: state?.user?._id,
      });

      if (response.data.success) {
        toast.success("Product added successfully to cart!!");
      }
    } catch (error) {
      toast.error("Internal server error, please try again...");
    }
  }

  return (
    <div style={{margin:"auto", width:"50%",border:"1px solid black",marginTop:"50px"}}>
            {singleProductData?.name ? <div style={{ display: 'flex' }}>

                <div style={{width:"50%", height:"470px"}} >
                    <img style={{width:"90%", height:"100%"}}  src={singleProductData.image}  />
                </div>
                <div >
                    <h1>{singleProductData.name}</h1>
                    <h3>Price : {singleProductData.price}</h3>
                    <h3>Category : {singleProductData.category}</h3>
                    <button style={{
              // marginLeft: "130px",
              marginTop: "15px",
              backgroundColor: " black",
              fontWeight: "700",
              border: "2px solid  black",
              color: "white",
              padding: "8px 35px",
              borderRadius: "20px",
            }} onClick={() => addToCart(singleProductData._id)}>Add to cart</button>
                </div>

            </div> : <div>Loading..</div>}
        </div>
  );
};

export default SingleProduct;
