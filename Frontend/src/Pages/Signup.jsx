import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from'react-toastify'
import { handleError, handleSuccess } from '../util';
import Footer from './Footer';

function Signup() {
    const [signupinfo, setsignupinfo]=useState({
        name:'',
        email:'',
        password:'',
    });
    const navigate=useNavigate();
    const handleOnChange=(e)=>{
        const {name,value}=e.target;
        const copysignupInfo={...signupinfo};
        copysignupInfo[name]=value;
        setsignupinfo(copysignupInfo)
        console.log("login ...=>",signupinfo);
    }           
    const handleSignup=async (e)=>{
        e.preventDefault();
        const {name,email,password}=signupinfo;
        if(!name || !email || !password){
            return handleSuccess('name, email and password required')
        }
        try {
            const url='https://product-revies-app.vercel.app/auth/signup';
            const resopnse=await fetch(url,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(signupinfo),
            })
            const result= await resopnse.json();
            console.log(result);
            const {success,message,error}=result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login');
                },1000)
            }else if(error){
                const detail=error?.details[0].message;
                handleError(detail);
            }else if(!success){
                handleError(message);
            }
         } catch (error) {
            
        }
    }

  return (
    <>
  <div className="login-page">
   <div className='container'>  
    <form onSubmit={handleSignup}>
    <h1>Signup</h1>
    <div>
        <label htmlFor="name">Name: </label>
        <input type="text" onChange={handleOnChange} autoFocus name='name' value={signupinfo.name} placeholder='Enter Your Name....' />
    </div>
    <div>
        <label htmlFor="email">Email: </label>
        <input type="email" onChange={handleOnChange} name='email' value={signupinfo.email}  placeholder='Enter Your Email....' />
    </div>
    <div>
        <label htmlFor="password">Password: </label>
        <input type="password" onChange={handleOnChange} name='password' value={signupinfo.password}  placeholder='Enter Your Password....' />
    </div>
    <button type="submit">Signup</button>
    <span>Already have an account.. 
        <Link to="/login">Login</Link>
    </span>
    <ToastContainer/>
    </form>
   </div>
   </div>
   
    <Footer/>
   </>
  )
}

export default Signup