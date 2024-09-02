import { connection as db } from "../config/index.js";
import { hash } from "bcrypt";


class Posts{
    fetchPosts(req, res){
        try {
          const strQry = `
          SELECT
          postID,
          userID,
          content,
          image_url
          FROM Posts;
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

      fetchRecentPosts(req, res){
        try {
          const strQry = `
              SELECT *
              FROM Posts 
              ORDER BY postID DESC
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
  
      fetchAPost(req,res){
          try {
              const strQry = `
          SELECT
          postID,
          userID,
          content,
          image_url
          FROM Posts
          WHERE postID = ${req.params.id};
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
  
      addAPost(req, res){
        try{
          let data = req.body
          const strQry = `
          INSERT INTO Posts
          SET ?;`
  
          db.query(strQry, [data], (err)=>{
            if(err) throw new Error('Unable to add post😔')
             res.json({
            status:res.statusCode,
            msg: 'Your post has been added😉'
          }) 
          })
        } catch (e) {
          res.json({
            status: 404,
            err: e.message
          });
        }
      }
  
       updateAPost(req,res){
          try {
              let data = req.body;
              const strQry = `
                  UPDATE Posts SET ? WHERE postID = '${req.params.id}';
                  `;
              db.query(strQry, [data], (err) => {
                if(err) throw new Error("Unable to update post😢");
                res.json({
                  status: res.statusCode,
                  msg: "The post was updated😁",
                });
              });
            } catch (e) {
              res.json({
                status: 404,
                err: e.message
              });
            }
      }
  
      deleteAPost(req,res){
          try {
              const strQry = `
                  DELETE FROM Posts WHERE postID = '${req.params.id}';`;
          
              db.query(strQry, (err) => {
                if(err) throw new Error("To delete a post, please review your delete query");
                res.json({
                  status: res.statusCode,
                  msg: "The post has been removed😁",
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
    Posts
}