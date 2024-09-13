import { connection as db } from "../config/index.js";
import { createToken } from "../middleware/AuthenticateUser.js";
import { compare, hash } from "bcrypt";
// changes
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

class Users {
  FetchUsers(req, res) {
    try {
      const sqlQry = `
            SELECT 
            userID, 
            firstName, 
            lastName,
            username,  
            email, 
            userPassword, 
            profile_picture_url,
            bio,
            userAge
            FROM Users;`;

      db.query(sqlQry, (err, results) => {
        if (err) throw new Error(err);

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

    FetchUser(req,res){
      try {
          const sqlQry = `
            SELECT
            userID,
            firstName,
            lastName,
            username,
            email,
            userPassword,
            profile_picture_url,
            bio,
            userAge
            FROM Users
          WHERE userID = '${req.params.id}';
              `;
          db.query(sqlQry, (err, result) => {
            if (err) throw new Error(err);
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

  async RegisterUser(req, res) {
    try {
      let data = req.body;
      data.userPassword = await hash(data.userPassword, 12);

      // payload
      let user = {
        email: data.email,
        userPassword: data.userPassword,
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

  async updateUser(req, res) {
    try {
      let data = req.body;
      if (data.userPassword) {
        data.userPassword = await hash(data.userPassword, 12);
      }
      const sqlQry = `
                UPDATE Users SET ? WHERE userID = ? 
                `;
      db.query(sqlQry, [data, req.params.id], (err) => {
        // "Unable to update user"
        if (err) throw new Error(err.message);
        res.json({
          status: res.statusCode,
          msg: "The user record was updated😉",
        });
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        err: e.message,
      });
    }
  }
  

  DeleteUser(req, res) {
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

  async Login(req, res) {
    try {
      const { email, userPassword } = req.body;
      const sqlQry = `
            SELECT 
            userID, 
            firstName, 
            lastName,
            username, 
            userAge, 
            email, 
            userPassword, 
            profile_picture_url,
            bio,
            userAge
            FROM Users
            WHERE email = '${email}';`;

      db.query(sqlQry, async (err, results) => {
        if (err) throw new Error("To login, please review your query");
        if (!results?.length) {
          res.json({
            status: 401,
            err: "You provided the wrong email🤨",
          });
        } else {
          const isValidPass = await compare(
            userPassword,
            results[0].userPassword
          );
          if (isValidPass) {
            const token = createToken({
              email,
              userPassword,
            });
            res.json({
              status: res.statusCode,
              token,
              result: results[0],
              msg: "You are logged in",
            });
          } else {
            res.json({
              status: 401,
              err: "Invalid password or you are not registered",
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

export { Users };
