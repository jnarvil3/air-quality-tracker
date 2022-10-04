// Importing express library
const express = require('express');

// Using an instance of a router here to manage middleware chain
const router = express.Router();

//Import user controller functions
const userController = require('../controllers/userController.js');

//Post req for creating new user
router.post('/signup', userController.createUser, (req,res) => {
    return res.status(200).json(res.locals.data)
});

//Get req for user login 
router.get('/login', userController.verifyUser, (req,res) => {
    return res.status(200).json(res.locals.data)
});


module.exports = router;