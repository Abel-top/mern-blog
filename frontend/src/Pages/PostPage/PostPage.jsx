import React, { useContext, useEffect, useState } from 'react'
import './postpage.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../Components/UserContext'

function PostPage() {
    const [post,setPost] =useState([])
    const [author,setAuthor] =useState('')
    const {setUserInfo,userInfo} =useContext(UserContext)
    const {id} =useParams()
    let  canEdit =true;

    
       
    useEffect(()=>{

        axios.get('http://localhost:3001/post/'+id)
        .then(res=>{
            setPost(res.data)
           
        //  console.log(res.data.author._id)
        setAuthor(res.data.author)
          
            
        })
        .catch(err=>console.log(err))

    },[])
    // console.log(author)
    // console.log(userInfo.id)
    if(author._id === userInfo.id){
        console.log(true)
        canEdit =true;
       }else{
        canEdit=false;
         console.log(false)
       }
if(!post) return <h1>No post</h1>
  return (
    <div className='posts-wrapper'>
        <div className="posts-container">
            <img className='post-image' src={`http://localhost:3001/${post.cover}`}/>
            {
                canEdit &&
                 <Link to= {`/edit/${post._id}` }>
                 <button className='edit-btn'>Edit post</button>
                 </Link>
            }
            <p className='text-center'>By {author.username}</p>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{__html:post.content}}  />
            
        </div>
    </div>
  )
}

export default PostPage