// Imports
import express from  'express';
import bodyParser from "body-parser";
import { messages } from "../model/index.js";

const msgRouter = express.Router()
msgRouter.use(bodyParser.json())

// All Messages
msgRouter.get('/', (req, res)=> {
    messages.fetchMessages(req, res)
})
// Single Message
msgRouter.get('/:id', (req,res)=>{ 
    messages.fetchMessage(req,res)
})

// Recent messages
// msgRouter.get('/recent', (req, res) => {
//     messages.fetchRecentMessages(req, res)
// })

// Add message
msgRouter.post('/add', (req, res) => {
    messages.addMessage(req, res)
    })
// Delete a Message
msgRouter.delete('/:id', (req,res)=>{
    messages.deleteMessage(req,res)
})

export{
    express,
    msgRouter
}