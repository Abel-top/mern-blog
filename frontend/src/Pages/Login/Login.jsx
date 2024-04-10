import React, { useState } from 'react'
import axios from 'axios'
import './login.css'
import { useNavigate } from 'react-router-dom'
function Login() {

  const [value,setValue]=useState({
        username:'',
        password:''
  })
  const navigate =useNavigate()
  axios.defaults.withCredentials = true;
 const handleSubmit= async (e)=>{
     e.preventDefault()
     await axios.post('https://mern-blog-server-eight.vercel.app/login',value)
     .then(res=>{
      console.log(res)
         if(res.data.Message){
           alert(res.data.Message)
         }if(res.data.Status){
          alert("Logged In")
          navigate('/')
          document.location.reload()
         }
     
      }
     )
     .catch(err=>console.log(err))

 }
  return (
    <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type="text" name='username'
         onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} placeholder='Username' />
        <input type="password" name ='password' onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})} placeholder='Password' />
        <button style={{color:'rgb(79, 80, 82)'}}>Login</button>
    </form>
  )
}

export default Login