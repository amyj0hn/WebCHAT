import { pool as db } from "../config/index.js";
import { hash } from "bcrypt";


class Notifications{
    fetchNotifications(req, res){
        try {
          const strQry = `
            SELECT 
            notificationID,
            userID,
            notificationType,
            entityID,
            message
            FROM Notifications;
              `
          db.query(strQry, (err, results) => {
            if(err) throw new Error("Issue occurred while retrieving all posts.");
            res.json({
              status: res.statusCode,
              results,
            });
          });
        } catch (e) {
          res.json({
            status: 404,
            msg: e.message,
          });
        }
      };

      fetchRecentNotifications(req, res){
        try {
          const strQry = `
              SELECT *
              FROM Notifications 
              ORDER BY notificationID DESC
              LIMIT 5;
              `
          db.query(strQry, (err, results) => {
            if(err) throw new Error(err);
            res.json({
              status: res.statusCode,
              results,
            });
          });
        } catch (e) {
          res.json({
            status: 404,
            msg: e.message,
          });
        }
      }
  
      fetchNotification(req,res){
          try {
              const strQry = `
            SELECT 
            notificationID,
            userID,
            notificationType,
            entityID,
            message
            FROM Notifications
          WHERE notificationID = ${req.params.id};
          `
              db.query(strQry, (err, result) => {
                if(err) throw new Error('Issue occurred while retrieving the desired post')
                res.json({
                  status: res.statusCode,
                  result: result[0],
                });
              });
            } catch (e) {
              res.json({
                status: 404,
                msg: e.message,
              });
            }
  }
  
      deleteNotification(req,res){
          try {
              const strQry = `
                  DELETE FROM Notifications WHERE notificationID = '${req.params.id}';`;
          
              db.query(strQry, (err) => {
                if(err) throw new Error("To delete a notification, please review your delete query");
                res.json({
                  status: res.statusCode,
                  msg: "The notification has been removed😁",
                });
              });
            } catch (e) {
              res.json({
                status: 404,
                err: e.message,
              });
            }
      }
}

export {
    Notifications
}