import { connection as db } from "../config/index.js";
import { createToken } from "../middleware/AuthenticateUser.js";
import { compare, hash } from "bcrypt";

class Users{
    FetchUsers( req, res){
        try {
            const sqlQry = `
            SELECT 
            userID, 
            firstName, 
            lastName,
            username, 
            userAge, 
            email, 
            password, 
            profile_picture_url,
            bio,
            date_of_birth
            FROM Users;`

            db.query(sqlQry, (err, results) =>{
                if (err) throw new Error("An issue ocurred while retrieving all users")
                res.json({
                    status:res.statusCode,
                    results
                });
            });
        } catch (e){
            res.json({
              status: 404,
              msg: e.message,
            });
          }
    }

    FetchUser(req,res){
      try {
          const sqlQry = `
            SELECT 
            userID, 
            firstName, 
            lastName,
            username, 
            email, 
            password, 
            profile_picture_url,
            bio,
            date_of_birth
            FROM Users 
          WHERE userID = '${req.params.id}';
              `;
          db.query(sqlQry, (err, result) => {
            if (err) throw new Error('Issue when retrieving a user');
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

    async RegisterUser(req,res){
        try {
            let data = req.body;
            data.userPass = await hash(data.userPass, 12);

            // payload
            let user = {
              emailAdd: data.email,
              password: data.password,
            };
            let reqQuery = `
                INSERT INTO Users SET ?;
                `;
            db.query(reqQuery, [data], (err, results) => {
              if (err) {
                console.log(err);
                
                res.json({
                  status: res.statusCode,
                  msg: "This email already exists👀",
                });
              } else {
                const token = createToken(user);
                res.json({
                  token,
                  msg: "You are registered😁",
                });
              }
            });
          } catch (e) {}
    }

    async UpdateUser(req,res){
        try {
            let data = req.body;
            if (data.password) {
              data.password = await hash(data.password, 12);
            }
            const sqlQry = `
                UPDATE Users SET ? WHERE userID = '${req.params.id}';
                `;
            db.query(sqlQry, [data], (err) => {
              if (err) throw new Error("Unable to update user");
              res.json({
                status: res.statusCode,
                msg: "The user record was updated😉",
              });
            });
          } catch (e) {
            res.json({
              status: 404,
              err: e.message,
            });
          }
    }

    DeleteUser(req,res){
        try {
            const sqlQry = `
                DELETE FROM Users WHERE userID = '${req.params.id}';`;
        
            db.query(sqlQry, (err) => {
              if (err)
                throw new Error("To delete a user, please review your delete query");
              res.json({
                status: res.statusCode,
                msg: "A user information was removed😁",
              });
            });
          } catch (e) {
            res.json({
              status: 404,
              err: e.message,
            });
          }
    }

    async Login(req,res){
        try {
            const { emailAdd, userPass } = req.body;
            const sqlQry = `
            SELECT 
            userID, 
            firstName, 
            lastName,
            username, 
            userAge, 
            email, 
            password, 
            profile_picture_url,
            bio,
            date_of_birth
            FROM Users
            WHERE emailAdd = '${emailAdd}';`;
        
            db.query(sqlQry, async (err, results) => {
              if (err) throw new Error("To login, please review your query");
              if (!results?.length) {
                res.json({
                  status: 401,
                  msg: "You provided the wrong email🤨",
                });
              } else {
                const isValidPass = await compare(userPass, results[0].userPass);
                if (isValidPass) {
                  const token = createToken({
                    emailAdd,
                    userPass,
                  });
                  res.json({
                    status: res.statusCode,
                    token,
                    result: results[0],
                  });
                } else {
                  res.json({
                    status: 401,
                    msg: "Invalid password or you are not registered",
                  });
                }
              }
            });
          } catch (e) {
            res.json({
              status: 404,
              msg: e.message,
            });
          }
    }
}

export {
    Users
}