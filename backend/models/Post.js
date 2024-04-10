import mongoose, { Schema } from "mongoose";

const PostSchema =mongoose.Schema({
    title:String,
    summary:String,
    content: String,
    cover:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
    
},{
    timestamps:true
})

const PostModel = mongoose.model('posts',PostSchema)

export default PostModel

