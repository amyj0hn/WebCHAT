import express from "express";
import bodyParser from "body-parser";
import { posts } from "../model/index.js";
// import { verifyAToken } from "../middleware/Authenticate.js";


const postRouter =  express.Router()
postRouter.use(bodyParser.json())

// All posts
postRouter.get('/', (req,res)=>{
    posts.fetchPosts(req,res)
})

// Recent posts
postRouter.get('/recent', (req,res)=>{
    posts.fetchRecentPosts(req,res)
})

// Single post
postRouter.get('/:id', (req,res)=>{
    posts.fetchAPost(req,res)
})

// Add/ Create post
postRouter.post('/add', (req,res)=>{
    posts.addAPost(req,res)
})

// Edit/ Update post
postRouter.patch('/:id', (req,res)=>{
    posts.updateAPost(req,res)
})

// Delete post
postRouter.delete('/:id',(req,res)=>{
    posts.deleteAPostt(req,res)
})

export{
    postRouter
}