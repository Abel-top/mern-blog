import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Register() {
  const navigate =useNavigate()
  
  const [value,setValue]=useState({
    username:'',
    password:''
})
const  handleSubmit= async (e)=>{
 e.preventDefault()
   await axios.post('http://localhost:3001/register',value)
   .then(res=>{
    
    console.log(res)
      if(res.data.Message){
        alert(res.data.Message)
      }
     
      if(res.data.Status){
        alert("success")

      }
        //  navigate('/login')
    })
   .catch(err=>{console.log(err)})
     

}
  return (
    <form onSubmit={handleSubmit}>
    <h1>Register</h1>
    <input type="text" name='username' 
    onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})}
    placeholder='Username' />
    <input type="password" name='password' 
    onChange={(e)=>setValue({...value,[e.target.name]:e.target.value})}
    placeholder='Password' />
    <button style={{color:'rgb(79, 80, 82)'}}>Sign Up</button>
    </form>
  )
}

export default Register