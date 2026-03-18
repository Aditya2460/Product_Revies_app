import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from'react-toastify'
import { handleError, handleSuccess } from '../util';
import Footer from './Footer';

function Login() {
    const [loginInfo, setlogininfo]=useState({
        email:'',
        password:'',
    });
    const navigate=useNavigate();
    const handleOnChange=(e)=>{
        const {name,value}=e.target;
        const copyloginInfo={...loginInfo};
        copyloginInfo[name]=value;
        setlogininfo(copyloginInfo)
        console.log("login ...=>",loginInfo);
    }           
    const handleLogin=async (e)=>{
        e.preventDefault();
        const {email,password}=loginInfo;
        if(!email || !password){
            return handleSuccess('email and password required')
        }
        try {
            const url='https://product-revies-app.vercel.app/auth/login';
            const resopnse=await fetch(url,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(loginInfo),
            })
            const result= await resopnse.json();
            console.log("result in ui section",result);
            const {success,message,jwttoken,role,name,error}=result;

            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwttoken)
                localStorage.setItem('logedInUser',name)
                localStorage.setItem("role", role);
                setTimeout(()=>{
                  (role=="admin") ? navigate('/admin') : navigate('/home');
                },1000)
            }else if(error){
                const detail=error?.details[0].message;
                handleError(detail);
            }else if(!success){
                handleError(message);
            }
         } catch (error) {
            handleError(error);
            
        }
    }

  return (<>
  <div className="login-page">
   <div className='container'>  
    <form onSubmit={handleLogin}>
    <h1>Login</h1>
    <div>
        <label htmlFor="email">Email: </label>
        <input type="email" onChange={handleOnChange} name='email' value={loginInfo.email}  placeholder='Enter Your Email....' />
    </div>
    <div>
        <label htmlFor="password">Password: </label>
        <input type="password" onChange={handleOnChange} name='password' value={loginInfo.password}  placeholder='Enter Your Password....' />
    </div>
    <button type="submit">Login</button>
    <span>Don't have an account.. 
        <Link to="/Signup">Signup</Link>
    </span>
    <ToastContainer/>
    </form>
   </div>
   </div>
   
    <Footer/>
   </>
  )
}

export default Login