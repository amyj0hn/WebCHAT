// Imports
import express from  'express';
import bodyParser from "body-parser";
import { collaboration } from "../model/index.js";

const collabRouter = express.Router()
collabRouter.use(bodyParser.json())

// All collaborators
collabRouter.get('/', (req, res)=> {
    collaboration.fetchCollabs(req, res)
})
// Single collaborator
collabRouter.get('/:id', (req, res)=>{ 
    collaboration.fetchCollab(req,res)
})

// Add collaborator
collabRouter.post('/add', (req, res) => {
    collaboration.addCollab(req, res)
    })

// Delete collaborator
collabRouter.delete('/delete', (req, res)=>{
    collaboration.deleteCollab(req, res)

})

export{
    express,
    collabRouter
}