// Imports
import express from  'express';
import bodyParser from "body-parser";
import { notifications } from "../model/index.js";

const notificationRouter = express.Router()
notificationRouter.use(bodyParser.json())

// All Notifications
notificationRouter.get('/', (req, res)=> {
    notifications.fetchNotifications(req, res)
})
// Single Notification
notificationRouter.get('/:id', (req,res)=>{ 
    notifications.fetchNotification(req,res)
})
// Recent notifications
notificationRouter.get('/recent', (req,res)=>{
    notifications.fetchRecentNotifications(req,res)
})
// Delete a Notification
notificationRouter.delete('/:id', (req,res)=>{
    notifications.deleteNotification(req,res)
})

export{
    express,
    notificationRouter
}