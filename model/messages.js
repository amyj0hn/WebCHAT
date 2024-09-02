import { connection as db } from "../config/index.js";
import { hash } from "bcrypt";


class Messages{
    fetchMessages(req, res){
        try {
          const strQry = `
            SELECT 
            messageID,
            senderID,
            recipientID,
            content
          FROM Messages;
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

//       fetchRecentMessages(req, res){
//         try {
//           const strQry = `
//             SELECT 
//             messageID,
//             senderID,
//             recipientID,
//             content
//             FROM Messages
//             ORDER BY messageID DESC
//             LIMIT 5;`
//           db.query(strQry, (err, results) => {
//             if(err) throw new Error(err);
//             res.json({
//               status: res.statusCode,
//               results,
//             });
//           });
//         } catch (e) {
//           res.json({
//             status: 404,
//             msg: e.message,
//           });
//         }
// }
  
      fetchMessage(req,res){
          try {
              const strQry = `
          SELECT
          messageID,
          senderID,
          recipientID,
          content
          FROM Messages
          WHERE messageID = ${req.params.id};
          `
              db.query(strQry,[data], (err, result) => {
                if(err) throw new Error(err)
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
  
      addMessage(req, res){
        try{
          let data = req.body
          const strQry = `
          INSERT INTO Messages
          SET ?;`
  
          db.query(strQry, [data], (err)=>{
            if(err) throw new Error('Unable to add message😔')
             res.json({
            status:res.statusCode,
            msg: 'Your message has been sent😉'
          }) 
          })
        } catch (e) {
          res.json({
            status: 404,
            err: e.message
          });
        }
      }
        
      deleteMessage(req,res){
          try {
              const strQry = `
                  DELETE FROM Messages WHERE messageID = '${req.params.id}';`;
          
              db.query(strQry, (err) => {
                if(err) throw new Error(err);
                res.json({
                  status: res.statusCode,
                  msg: "The message has been deleted😁",
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
    Messages
}