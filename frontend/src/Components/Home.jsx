import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';

const Home = () => {

  const { state } = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState();
    useEffect(() => {
        async function getProducts() {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await api.get("/all-products", { token })
            if (response.data.success) {
                setAllProducts(response.data.products)
            }
        }
        getProducts();
    }, [])

  return (
    <div>
      
    <div style={{textAlign:"center"}}>Welcome- {state?.user?.name}</div>
    <div>
            <h1></h1>

            {allProducts?.length ? <div style={{ display: "flex", justifyContent: "space-around" }}> {allProducts.map((product) => (
                <div style={{border:"2px solid grey", width:"230px", height:"400px"}} key={product._id}>
                    <img style={{width:"100%", height:"73%"}} src={product.image} />
                    <h3>Name : {product.name}</h3>
                    <h3>Price : {product.price}</h3>
                </div>
            ))}
            </div> : <div>No Products found!</div>}
        </div>
    </div>

  )
}

export default Home