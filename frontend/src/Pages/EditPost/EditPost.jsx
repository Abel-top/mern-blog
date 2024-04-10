import React, { useEffect } from 'react'
import './editpost.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const {id} =useParams()
    const [title,setTitle] =useState('')
    const [summary,setSummary] =useState('')
    const [content,setContent] =useState('')
    const [files,setFiles] =useState('')
    const navigate=useNavigate()
 axios.defaults.withCredentials=true

 useEffect(()=>{
     
    axios.get('http://localhost:3001/post/'+id)
    .then(res=>{
        setTitle(res.data.title)
        setContent(res.data.content)
        setSummary(res.data.summary)
        
    })
    .catch(err=>console.log(err))

 },[])


    const handleSubmit= async (e)=>{
        const data = new FormData()
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',content)
        data.set('id',id)
        if(files?.[0]){

            data.set('file',files?.[0])
        }
        
        e.preventDefault()
        
        try {
            const response = await axios.put("http://localhost:3001/post",data)
             if(response.data.Status){

                 navigate('/post/'+id)
             }
                console.log(response)

            
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
                <button>Edit</button>

            </form>
        </div>
    </div>
  )
}

export default EditPost