import React from 'react'
import './createpost.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreatePost() {
    const [title,setTitle] =useState('')
    const [summary,setSummary] =useState('')
    const [content,setContent] =useState('')
    const [files,setFiles] =useState('')
    const navigate=useNavigate()
 axios.defaults.withCredentials=true

    const handleSubmit= async (e)=>{
        const data = new FormData()
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',content)
        data.set('file',files[0])
        
        e.preventDefault()
        
        try {
            const response = await axios.post("http://localhost:3001/createPost",data)
           if(response.data.Status){
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            
        }
      

        // .then(res=>console.log(res))
        // .catch(err=>console.log(err))
       
    }
  return (
    <div className='post-wrapper'>
        <div className="post-container">
            <form onSubmit={handleSubmit}>
                <input type="title" required placeholder='Title' value={title} onChange={e=> setTitle(e.target.value)}/>
                <input type="summary" required placeholder='Summary' value ={summary} onChange={e=> setSummary(e.target.value)}/>
                <input type="file" required onChange={e=> setFiles(e.target.files)}/>
                <ReactQuill value={content} onChange={newValue=>setContent(newValue)}/>
                <button>Create</button>

            </form>
        </div>
    </div>
  )
}

export default CreatePost