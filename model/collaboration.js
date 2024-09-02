import { connection as db } from "../config/index.js";
import { hash } from "bcrypt";
class Collaboration{
    fetchCollabs(req, res){
        try {
          const strQry = `
            SELECT 
            collaborationID,
            title,
            collaboDesc
            FROM Collaborations;
              `
          db.query(strQry, (err, results) => {
            if(err) throw new Error("Issue occurred while retrieving all collaborations.");
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
  
      fetchCollab(req,res){
          try {
              const strQry = `
          SELECT
            collaborationID,
            title,
            collaboDesc
            FROM Collaborations
          WHERE collaborationID = ${req.params.id};
          `
              db.query(strQry, (err, result) => {
                if(err) throw new Error('Issue occurred while retrieving the desired collaborator')
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
  
    addCollab(req, res){
        try{
          let data = req.body
          const strQry = `
          INSERT INTO Collaborations
          SET ?;`
  
          db.query(strQry, [data], (err)=>{
            if(err) throw new Error('Unable to add collaboration😔')
             res.json({
            status:res.statusCode,
            msg: 'Your collaboration has been added😉'
          }) 
          })
        } catch (e) {
          res.json({
            status: 404,
            err: e.message
          });
        }
      }
        
      deleteCollab(req,res){
          try {
              const strQry = `
                  DELETE FROM Collaboration WHERE collaborationID = '${req.params.id}';`;
          
              db.query(strQry, (err) => {
                if(err) throw new Error("To delete a collaboration, please review your delete query");
                res.json({
                  status: res.statusCode,
                  msg: "The collaboration has been deleted😁",
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
    Collaboration
}