// Create a structure of POST schema

import mongoose from 'mongoose'
const Post = new mongoose.Schema({
    name: {type: String, required:true},
    prompt: {type: String, required:true},
    photo: {type: String, required:true},
})

// Create the model of the Schema

const PostSchema = mongoose.model('Post',Post)
export default PostSchema