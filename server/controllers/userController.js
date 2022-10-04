// Import our postgreSQL database instance 
const db = require('../models/userModel.js');

const userController = {};

// Registers a new user via signup page (post)
userController.createUser = (req, res, next) => {
    const { username, password, city, threshold } = req.body;

    // Paramaterization to reduce risk of SQL injection attacks
    const value = [username, password, city, threshold];
    const query = 'INSERT INTO Users (username, password, city, threshold) VALUES ($1,$2,$3,$4) RETURNING *';
  
    // PostgreSQL create query
    db.query(query, value)
      .then((data) => {
        res.locals.data = {};
        res.locals.data.user = data.rows[0];
        return next();
      })
      // Error handler if query fails
      .catch((err) => {
        return next({
          log: 'Express error handler caught userController.createUser',
          message: { err: err },
        });
      });
  };

// Verifies a new user on login (get)
userController.verifyUser = (req, res, next) => {

    // Take user & password data from req headers (more secure than storing them in URL parameters)
    const credentials = req.headers.authorization.split(' ');

    const username = credentials[0];
    const password = credentials[1];
  
    // Paramaterization to reduce risk of SQL injection attacks
    const value = [username, password];
    const query = 'SELECT * FROM Users WHERE username = $1 AND password = $2'
  
    // PostgreSQL read query
    db.query(query, value)
      .then(data => {
        if (data.rows[0]){
          res.locals.data = {};
          res.locals.data.user = data.rows[0];
          return next();
        } else {
          return next ('user not found')
        }
      })
      // Error handler if query fails
      .catch (err => {
        return next('error in userController.verifyUser', err);
      })
  };

module.exports = userController;