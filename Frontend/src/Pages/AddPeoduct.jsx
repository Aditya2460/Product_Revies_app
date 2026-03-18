import React, { useState } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function AddProduct() {

  const [product,setProduct] = useState({
    name:"",
    price:"",
    description:"",
    image:""
  });
  const Navigate=useNavigate()

  const handleChange = (e)=>{
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const res = await fetch("https://product-revies-app.vercel.app/products",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(product)
    });

    const data = await res.json();

    alert("Product Added Successfully");

    setProduct({
      name:"",
      price:"",
      description:"",
      image:""
    });
  };
  const name=localStorage.getItem("logedInuser");
  const handleBack=(e)=>{
    Navigate("/home");
  }

  return (
    <>
         <div className="Maincontaint"><div className="navbar">

  <h2 className="user-name">{name}</h2>

  
  <button className="logout-btn" onClick={handleBack}>
    Back
  </button>

</div>
  </div>
    <div className="form-container">
   

      <h2 >Add Product</h2>

      <form onSubmit={handleSubmit} className="product-form">

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Product</button>

      </form>

    </div>
    
    <Footer/>
    </>
  );
  
}

export default AddProduct;