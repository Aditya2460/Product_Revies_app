import React, { useEffect } from 'react'
import { replace, useLocation, useNavigate } from 'react-router-dom'

function RfrenceHandler({setAuthenticated}) {
    const location=useLocation();
    const Navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('token')){
        setAuthenticated(true);
        if(location.pathname==='/' || 
            location.pathname === '/login' || 
            location.pathname ==='/signup'
        ){
            Navigate('/home',{replace: false})
        }
    }
    },[location.pathname,Navigate,setAuthenticated])
    
  return (
    null
  )
}

export default RfrenceHandler