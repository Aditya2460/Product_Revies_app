
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup' 
import './App.css'
import './login.css'

import './Footer.css'
import { useState } from 'react'
import RfrenceHandler from './RfrenceHandler'
import Products from './Pages/Product'
import ProductDetails from './Pages/Details'
import AddPeoduct from './Pages/AddPeoduct'

function App() {
  const [isAuthenticated,setAuthenticated]=useState(false)
  const PrivateRoute=({element})=>{
   return isAuthenticated? element : <Navigate to="/login"/>;
  }
  return <>
  <RfrenceHandler setAuthenticated={setAuthenticated}/>
  <Routes>
  <Route path="/" element={<Navigate to="/login"/>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/signup" element={<Signup/>} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/signup" element={<Signup/>} />
  <Route path="/addProduct" element={<AddPeoduct />} />
  <Route path="/home" element={<PrivateRoute element={<Products/>}/>} />
  </Routes>
  </>
}

export default App
