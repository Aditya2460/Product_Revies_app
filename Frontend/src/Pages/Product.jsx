import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCards";
import { handleError, handleSuccess } from "../util";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Products() {

  const [Products, setProducts] = useState([]);
  const Navigate=useNavigate();
  const logedInuser=localStorage.getItem("logedInUser")

  useEffect(() => {

    const fetchProducts = async () => {
      try {

        const url = "https://product-revies-app-api.vercel.app/products";
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




  return (<>
  <Navbar/>
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