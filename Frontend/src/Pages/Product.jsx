import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCards";
import { handleError, handleSuccess } from "../util";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Products() {

  const [Products, setProducts] = useState([]);
  const Navigate=useNavigate();
  const logedInuser=localStorage.getItem("logedInUser")

  useEffect(() => {

    const fetchProducts = async () => {
      try {

        const url = "http://localhost:8080/products";
        const token = localStorage.getItem("token");

        const response = await fetch(url, {
          headers: {
            Authorization: token
          }
        });

        const products = await response.json();
        setProducts(products);

      } catch (error) {
        handleError(error);
      }
    };
    
    fetchProducts();

  }, []);

// Handle Add Product
const handleAddProduct=(e)=>{
  Navigate('/addProduct')
}


  const handleLogOut=(e)=>{
      localStorage.removeItem('token')
      localStorage.removeItem('logedInUser');
      handleSuccess('User Loged Out')
      setTimeout(()=>{
        Navigate('/login')
      },1000)
    }


  return (<>
  <div className="Maincontaint"><div className="navbar">

  <h2 className="user-name">{logedInuser}</h2>

  <button className="logout-btn" onClick={handleAddProduct}>
    Add Product
  </button>
  <button className="logout-btn" onClick={handleLogOut}>
    Logout
  </button>

</div>
  </div>
    <div className="products-container">
      {Products && Products.map((item, index) => (
        <ProductCard key={index} product={item} />
      ))}
    </div>
    <Footer/>
    </>
  );
}

export default Products;