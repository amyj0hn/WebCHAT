// Imports
import express from  'express';
import bodyParser from "body-parser";
import { users } from "../model/index.js";

const userRouter = express.Router()
userRouter.use(bodyParser.json())

// All Users
userRouter.get('/', (req, res)=> {
    users.FetchUsers(req, res)
})
// Single User
userRouter.get('/:id', (req,res)=>{ 
    users.FetchUser(req,res)
})

// Register a User
userRouter.post('/register', (req,res)=>{
    users.RegisterUser(req,res)
})

// Update a User
userRouter.patch('/:id', (req,res)=>{
    users.UpdateUser(req,res)
})

// Delete a User
userRouter.delete('/:id', (req,res)=>{
    users.DeleteUser(req,res)
})

// User Login
userRouter.post('/login', (req,res)=>{
    users.Login(req,res)
})

export{
    express,
    userRouter
}
