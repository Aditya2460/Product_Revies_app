
import React, { useEffect, useState } from "react";
function AdminDesktop() {
   
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "" });

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:8080/admin");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await fetch("http://localhost:8080/admin/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    setForm({ name: "", price: "", description: "", image: "" });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/admin/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchProducts();
  };

  return (
    <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
      {/* Add Product Form */}
      <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px" }}>
        <h2>Add Product</h2>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br /><br />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} /><br /><br />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br /><br />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} /><br /><br />
        <button onClick={handleCreate}>Add Product</button>
      </div>

      {/* Product List */}
      <div>
        <h2>Products</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "10px" }}>
          {products.map((p) => (
            <div key={p._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
              <img src={p.image} alt="" style={{ width: "100%", height: "150px", objectFit: "cover" }} />
              <h3>{p.name}</h3>
              <p>₹ {p.price}</p>
              <p>{p.description}</p>
              <button onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDesktop