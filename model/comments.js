import { connection as db } from "../config/index.js";
import { hash } from "bcrypt";


class Comments{
    fetchComments(req, res){
        try {
          const strQry = `
          SELECT
          commentID,
          userID,
          postID,
          commentText
          FROM Comments;
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
      };
  
      fetchComment(req,res){
          try {
              const strQry = `
          SELECT
          postID,
          userID,
          commentText
          FROM Comments
          WHERE postID = ${req.params.id};
          `
              db.query(strQry, (err, result) => {
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
  
      addComment(req, res){
        try{
          let data = req.body
          const strQry = `
          INSERT INTO Comments
          SET ?;`
  
          db.query(strQry, [data], (err)=>{
            if(err) throw new Error('Unable to add comment😔')
             res.json({
            status:res.statusCode,
            msg: 'Your comment has been added😉'
          }) 
          })
        } catch (e) {
          res.json({
            status: 404,
            err: e.message
          });
        }
      }
  
       updateComment(req,res){
          try {
              let data = req.body;
              const strQry = `
                  UPDATE Comments ? WHERE postID = '${req.params.id}';
                  `;
              db.query(strQry, [data], (err) => {
                if(err) throw new Error("Unable to update comment😢");
                res.json({
                  status: res.statusCode,
                  msg: "The comment was updated😁",
                });
              });
            } catch (e) {
              res.json({
                status: 404,
                err: e.message
              });
            }
      }
  
      deleteComment(req,res){
          try {
              const strQry = `
                  DELETE FROM Comments WHERE commentID = '${req.params.id}';`;
          
              db.query(strQry, (err) => {
                if(err) throw new Error("To delete a post, please review your delete query");
                res.json({
                  status: res.statusCode,
                  msg: "The comment has been removed😁",
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
    Comments
}