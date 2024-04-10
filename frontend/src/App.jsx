
import {BrowserRouter,Outlet,Route,Routes} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Navbar from './Components/Navbar'
import './App.css'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import { UserContextProvider } from './Components/UserContext.jsx'
import CreatePost from './Pages/CreatePost/CreatePost.jsx'
import PostPage from './Pages/PostPage/PostPage.jsx'
import EditPost from './Pages/EditPost/EditPost.jsx'

function App() {
  const Layout=()=>{
      return(
        <div>
        <Navbar/>
        <Outlet/>
        </div>
      )
  }

  
  

  return (
    <div className='app'>

      <UserContextProvider>
      <BrowserRouter >
      
             <Routes>
        <Route path='/' element={<Layout/>}>
        
          <Route path='/' element= {<Home/>}/>
          
          <Route path='/login' element= {<Login/>}/>
          <Route path='/register' element= {<Register/>}/>
          <Route path='/create' element= {<CreatePost/>}/>
          <Route path='/post/:id' element={<PostPage/>}/>
          <Route path='/edit/:id' element={<EditPost/>}/>
        </Route>
      </Routes>
      
     
    
    </BrowserRouter>
      </UserContextProvider>
   
      
    </div>
  )
}

export default App
