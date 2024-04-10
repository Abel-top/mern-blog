import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


function Post() {
 const[posts,setPosts] = useState([])
 axios.defaults.withCredentials =true

 useEffect(()=>{
   const getData=async ()=>{

    try {
        const res = await axios.get('https://mern-blog-server-eight.vercel.app/posts')
        
         console.log(res)
        setPosts(res.data)
        // console.log(res.data)
    } catch (error) {
        console.log(error)
    }
     
    
   }
    getData()

 },[])
  return (
    <div className='p-wrapper'>

       {
        posts.length >0 &&
      posts.map((post,index)=>(
        <div className='p-container' key={index}>
            <Link to={`/post/${post._id}`}>
            <img src={'https://mern-blog-server-eight.vercel.app/'+post.cover} />
            </Link>
            <div className="texts">

            <h2>{post.title}</h2>
            <span>{post.author.username}</span>
            <time style={{marginLeft:".5rem"}}>{post.createdAt}</time>
            <p>{post.summary}</p>

            </div>
        </div>
      ))
    }
         
        </div>
  )
}

export default Post