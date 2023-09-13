import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import api from "./ApiConfig";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { state } = useContext(AuthContext);
  const router = useNavigate();
  const [allProducts, setAllProducts] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 4;

  useEffect(() => {
    async function getProducts() {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await api.get("/all-products", { token });
      if (response.data.success) {
        setAllProducts(response.data.products);
      }
    }
    getProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = allProducts?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentProducts = filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts?.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>Welcome- {state?.user?.name}</div>
      <div>
      <div >
          <input style={{ margin:"20px 0 30px 80%", height:"30px", width:"200px"}}
            type="text"
            placeholder="Search products"

            onChange={handleSearchChange}
          />
        </div>

        {currentProducts?.length ? (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {" "}
            {currentProducts.map((product) => (
              <div
                onClick={() => router(`/singleproduct/${product._id}`)}
                key={product._id}
                style={{
                  border: "2px solid grey",
                  width: "230px",
                  height: "400px",
                }}
                // key={product._id}
              >
                <img
                  style={{ width: "100%", height: "73%" }}
                  src={product.image}
                />
                <h3>{product.name}</h3>
                <h3>Price : {product.price}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div>No Products found!</div>
        )}
      </div>
      <div style={{width:"60%",margin:"auto",display:"flex",justifyContent:"space-between",marginTop:"35px"}}>
          <button onClick={prevPage}>Previous Page</button>
          <button onClick={nextPage}>Next Page</button>
        </div>
    </div>
  );
};

export default Home;

