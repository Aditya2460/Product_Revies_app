
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
function AdminDesktop() {
   
  const [products, setProducts] = useState([]);
  const navigate=useNavigate();
    const [loading, setloading]=useState(true)
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const res = await fetch("https://product-revies-app.vercel.app/admin");
    const data = await res.json();
    
    setProducts(data.data);
    setloading(false)
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    await fetch(`https://product-revies-app.vercel.app/admin/Update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(form)
    });

    setForm({ name: "", price: "", description: "", image: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await fetch(`https://product-revies-app.vercel.app/admin/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      }
    });
    fetchProducts();
  };
   
 const handleEdit = (product) => {
  setForm({
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image
  });

  setEditId(product._id);
};
const handleViewDetail=(Product)=>{
  navigate(`/product/${Product._id}`)
}

  return (<>
  <Navbar/>
    <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
      {/* Add Product Form */}
      <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px" }}>
        <h2>Edit Product</h2>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br /><br />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} /><br /><br />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br /><br />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} /><br /><br />
        <button onClick={()=>handleUpdate(editId)}>Update Product</button>
      </div>

      {/* Product List */}
      <div>
        <h2>Products</h2>
        {(loading) ? <Loading/> : ""}
       


        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "10px" }}>
          {products.map((p) => (
            <div key={p._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
              <img src={p.image} alt="" style={{ width: "100%", height: "150px", objectFit: "cover" }} />
              <h3>{p.name}</h3>
              <p>₹ {p.price}</p>
              <p>{p.description}</p>
              <button onClick={() => handleDelete(p._id)}>Delete</button>
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleViewDetail(p)}>View Detal</button>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default AdminDesktop