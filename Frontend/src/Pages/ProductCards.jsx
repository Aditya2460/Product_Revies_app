import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
    const navigate=useNavigate();
    console.log(product);
    const handleReview=(e)=>{
      navigate(`/product/${product._id}`)
    }
    
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>

        <p className="product-desc">
          {product.description}
        </p>

        <h4 className="product-price">
          ₹{product.price}
        </h4>

        <button className="view-btn" onClick={handleReview}>
          View Reviews
        </button>
      </div>

    </div>
  );
}

export default ProductCard;