import React, { useContext, useEffect, useState } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from './UserContext'
function Navbar() {

  // const [user,setUser]=useState(null)
  const {setUserInfo,userInfo} =useContext(UserContext)
  
  axios.defaults.withCredentials =true
  useEffect(()=>{
       axios.get('https://mern-blog-server-eight.vercel.app/profile')
       .then(res=>setUserInfo(res.data))
       .catch(err=>console.log(err))
   

  },[])
   const handleLogout=()=>{
    axios.post('https://mern-blog-server-eight.vercel.app/logout')
    .then(res=>{
      if(res.data.Status){
        document.location.reload()
        setUserInfo(null)

      }
    })
    .catch(err=>console.log(err))

   }
   const user =userInfo?.username;
   
  return (
    <div className="n-wrapper">
        <div className="n-container">
          <div className="logo"><Link className='logo' to='/'>MyBlog</Link></div>
          <div className="n-right">
            {
              user  && (
                <>
                 <span><Link to='' className='login-span'>{user}</Link></span>
                 <Link to='/create' className='link'>Create new post </Link>
                 <Link to='' className='link' onClick={handleLogout}>Logout</Link>
                </>
              )
            }
            {
              !user && (
                <>
            <span><Link to='/login' className='login-span'>Login</Link></span>
            <span><Link to='/register' className='register-span' >SignUp</Link></span>
                </>
              )
            }
            
          </div>
        </div>
    </div>
  )
}

export default Navbar