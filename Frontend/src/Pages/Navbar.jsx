import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const Navigate = useNavigate();
  const [menuOpen,setMenuOpen] = useState(false);

  const logedInuser = localStorage.getItem("logedInUser")

  const handleAddProduct = () =>{
    Navigate('/addProduct')
    setMenuOpen(false)
  }

  const handleLogOut = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('logedInUser')
    Navigate('/login')
  }
  const role=localStorage.getItem("role");

  return (
    <div className="Maincontaint">

      <div className="navbar">

        <h2 className="user-name">{logedInuser}</h2>

        {/* hamburger */}
        <div
          className="hamburger"
          onClick={()=>setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* nav buttons */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>

          <button className={`logout-btn ${role === "admin" ? "show" : "hide"} `} onClick={handleAddProduct}>
            Add Product
          </button> 

          <button className="logout-btn" onClick={handleLogOut}>
            Logout
          </button>

        </div>

      </div>

    </div>
  )
}

export default Navbar