import React, { useEffect, useState } from 'react'

const YourProducts = () => {
    const [allProducts, setAllProducts] = useState();
    useEffect(() => {
        async function getProducts() {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await api.post("/get-your-products", { token })
            if (response.data.success) {
                setAllProducts(response.data.products)
            }
        }
        getProducts();
    }, [])
    return (
        <div>
            <h1>Your Products</h1>

            {allProducts?.length ? <div style={{ display: "flex", justifyContent: "space-around" }}> {allProducts.map((product) => (
                <div style={{border:"2px solid grey", width:"230px", height:"400px"}} key={product._id}>
                    <img style={{width:"100%", height:"73%"}} src={product.image} />
                    <h3>Name : {product.name}</h3>
                    <h3>Price : {product.price}</h3>
                </div>
            ))}
            </div> : <div>No Products found!</div>}
        </div>
    )
}

export default YourProducts