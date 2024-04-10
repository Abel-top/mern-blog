import express, { json } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import UserModel from './models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import fs from 'fs'
import PostModel from './models/Post.js'
import { dirname } from 'path'

const uploadMiddleware =multer({dest:'uploads/'})

const app=express()
const salt = bcrypt.genSaltSync(10)
app.use(cors(
  { 
   credentials:true,
   origin:'http://localhost:5173'
}
))
app.use(express.json())
app.use(cookieParser())

app.use('/uploads',express.static('uploads'))

mongoose.connect('mongodb+srv://jida:jida12$$@cruddb.5svatrx.mongodb.net/blogdb?retryWrites=true&w=majority&appName=crudDB')

app.post('/register',async (req,res)=>{
    const username=req.body.username
    const password=req.body.password
    const hash = bcrypt.hashSync(password,salt)
    const userDoc = await UserModel.findOne({username:username})
    try{
        if(userDoc){
            return res.json({Status:false,Message:'UserLaredy exist'})
        }
        await UserModel.create({
            username:username,
            password:hash
        })
        //Registerd

        return res.json({Status:true,Data:username})
    }catch(err){
        res.json(err)
    }
})

app.post('/login',async (req,res)=>{
    const username =req.body.username
    const password =req.body.password
    const userDoc = await UserModel.findOne({username:username})
    
    if(userDoc){
         const auth = bcrypt.compareSync(password,userDoc.password)
         if(auth){
            //logged in
              jwt.sign({username,id:userDoc._id},'secret',{},(err,token)=>{
                if(err) return res.json(err)
                res.cookie('token',token).json({Status:true})
                
              })

           // res.json({Status:true,Result:result})
    
        }else{
            res.json({Status:false,Message:"Invaid Credentials"})
        }
    }else{
       return res.json({Status:false,Message:"User not Found"})
    }

})

app.get('/profile',(req,res)=>{
  const {token}= req.cookies
   
    jwt.verify(token,'secret',{},(err,info)=>{
       if(err) return res.json(err)

       res.json(info)

    })

}
   
)
app.post('/logout',(req,res)=>{
    res.cookie('token','').json({Status:true})
})
app.post('/createPost',uploadMiddleware.single('file') , async (req,res)=>{
  
  const {originalname,path} = req.file
  const parts =originalname.split('.')
  const ext =parts[parts.length-1]
  const newpath =path+"."+ext
  fs.renameSync(path,newpath)


  const {token}= req.cookies
   
    jwt.verify(token,'secret',{},async (err,info)=>{
       if(err) return res.json(err)


       const {title,summary,content}=req.body
       const postDoc = await PostModel.create({
         title,
         summary,
         content,
         cover:newpath,
         author:info.id
       }) 
         res.json({Status:true})
         

    })

    
})
app.get('/posts',async(req,res)=>{

 res.json(await PostModel.find().populate('author',['username']))
})
app.get('/post/:id',async (req,res)=>{
   const id= req.params.id 
   const postDoc = await PostModel.findById(id).populate('author',['id','username'])
  res.json(postDoc)

})
app.put('/post',uploadMiddleware.single('file') ,(req,res)=>{
   let newpath =null
  if(req.file){
    const {originalname,path} = req.file
    const parts =originalname.split('.')
    const ext =parts[parts.length-1]
    newpath =path+"."+ext
    fs.renameSync(path,newpath)
  }

  const {token}= req.cookies
   
    jwt.verify(token,'secret',{}, async (err,info)=>{
       if(err) return res.json(err)


     const {id,title,summary,content} =req.body
    
      const postDoc = await PostModel.findById(id)
      const isAuthor = JSON.stringify(info.id) === JSON.stringify(postDoc.author)

      //res.json('ok')
      

      if(!isAuthor){
          return res.json({Status:false,Message:'Not Auhtor'})
      }
      
     
      const updated =await PostModel.findByIdAndUpdate(id,{
        title,
        summary,
        content,
        cover:newpath ? newpath :postDoc.cover,

      },{new:true})
       
      res.json({Status:true})

    })
 
   

})
app.listen(3001,()=>{
    console.log("listening")
})
