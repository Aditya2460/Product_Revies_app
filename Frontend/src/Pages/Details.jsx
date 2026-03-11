import React, { useEffect, useState } from "react";
import '../App.css'
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewText,setReviewText]=useState("");
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const navigate=useNavigate();

  const token = localStorage.getItem("token");

  // Dummy fetch (replace with API)
  useEffect(() => {

  const fetchProduct = async () => {
    const res = await fetch(`http://localhost:8080/products/${id}`);
    const data = await res.json();
    setProduct(data);
  setLoading(false);
  };

const fetchReviews = async () => {
  try {
    const res = await fetch(`http://localhost:8080/reviews/${id}`);
    const data = await res.json();


    setReviews(data);
  } catch (err) {
    console.error("Review fetch error:", err);
  } finally {
    setReviewsLoading(false);
  }
};

  fetchProduct();
  fetchReviews();

}, [id]);


const handleBack=(e)=>{
  navigate("/home")
  
}

const name = localStorage.getItem("logedInUser");

  const handleReview = async () => {

  if(!reviewText.trim()){
    return alert("Write something first");
  }

  

  const newReview = {
    productId: id,
    user: name,
    comment: reviewText
  };

  const res = await fetch("http://localhost:8080/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newReview)
  });

  const savedReview = await res.json();

  setReviews((prev)=>[...prev, savedReview]);

  setReviewText("");
};
if(loading){
  return <h2>Loading product...</h2>;
}else{
  return (<>
    

    <div className="details-container">
      
     <div className="navbar">
  <h2 className="user-name">{name || "Guest"}</h2>

  <button className="logout-btn" onClick={handleBack}>
    Back
  </button>
</div>
      {/* PRODUCT SECTION */}
      <div className="product-section">
        

        <img
          src={product.image}
          alt={product.name}
          className="details-image"
        />

        <div className="product-details">
          <h2>{product.name}</h2>
          <h3 className="price">₹{product.price}</h3>
          <p>{product.description}</p>
        </div>

      </div>

      {/* REVIEWS */}
      <div className="review-section">
        <h2>Reviews</h2>
{reviewsLoading ? (
  <p>Loading reviews...</p>
) : reviews.length === 0 ? (
  <h3>No Reviews yet...</h3>
) : (
  reviews.map((rev) => (
    <div key={rev._id} className="review-card">
      <h4>{rev.user}</h4>
      <p>{rev.comment}</p>
    </div>
  ))
)}
      </div>

      {/* ADD REVIEW */}
      {token && (
        <div className="add-review">
          <h3>Add Review</h3>

          <textarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            
          />

          <button onClick={(e)=>{handleReview(e)}}>Add Review</button>
        </div>
      )}

      {!token && (
        <p className="login-msg">
          Login to add review
        </p>
      )}

    </div>
    <Footer/>
    </>
  );
}
}

export default ProductDetails;