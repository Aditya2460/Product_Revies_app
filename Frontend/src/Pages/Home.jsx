// import React, { useEffect, useState } from 'react'
// import {ToastContainer} from 'react-toastify'
// import { handleError, handleSuccess } from '../util';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//   const [logedInuser,setlogedinUser]=useState('');
//   const [Products,setProducts]=useState('');

//   const Navigate=useNavigate();
//   useEffect(()=>{
//     setlogedinUser(localStorage.getItem('logedInUser'))
//   },[])
//     const handleLogOut=(e)=>{
//       localStorage.removeItem('token')
//       localStorage.removeItem('logedInUser');
//       handleSuccess('User Loged Out')
//       setTimeout(()=>{
//         Navigate('/login')
//       },1000)
//     }


//     const fetchProducts=async ()=>{
//       try {
//         const headers={
//           headers:{
//           'Authorization':localStorage.getItem('token'),
//         }
//         };
//         const url='http://localhost:8080/products';
//         const response= await fetch(url,headers)
//         const result=await response.json();
//         console.log(result[0]);
        
//         setProducts(result)
      
        
//       } catch (error) {
//         handleError(error)
//       }
//     }
//     useEffect(()=>{
//       fetchProducts()
//     },[])
//   return (<>
//     <div className='container2'> <h1> {logedInuser}</h1></div>
//     <button onClick={handleLogOut}>LogOut</button>
//     <div>
//       {
//         Products && Products.map((item,Index)=>(
//           <ul key={Index}>
//          <span> {item.name}:{item.age}</span>
//          </ul>
//         ))
//       }
//     </div>
//     <ToastContainer/>
//     </>
//   )
// }

// export default Home