import express from "express";
import bodyParser from "body-parser";
import { comments } from "../model/index.js";
// import { verifyAToken } from "../middleware/Authenticate.js";


const commentsRouter =  express.Router()
commentsRouter.use(bodyParser.json())

// All comments
commentsRouter.get('/', (req,res)=>{
     comments.fetchComments(req,res)
})

// Single comment
commentsRouter.get('/:id', (req,res)=>{
     comments.fetchComment(req,res)
})

// Add a comment
commentsRouter.post('/add', (req,res)=>{
     comments.addComment(req,res)
})

// Edit/ Update post
commentsRouter.patch('/:id', (req,res)=>{
     comments.updateComment(req,res)
})

// Delete post
commentsRouter.delete('/:id',(req,res)=>{
     comments.deleteComment(req,res)
})

export{
    commentsRouter
}