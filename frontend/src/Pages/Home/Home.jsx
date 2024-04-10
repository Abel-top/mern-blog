import React from 'react'
import './home.css'
import {data} from '../../Components/utils/data.js'
import Post from '../../Components/Post/Post.jsx'
import axios from 'axios'

function Home() {
  
axios.defaults.withCredentials=true
  return (

    <div className='p-wrapper'>
      <Post />
    </div>
    
    
  )
}

export default Home