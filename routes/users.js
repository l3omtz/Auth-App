const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Bring in user model
const User = require('../models/user');

// Register the REGISTER route
router.post('/register', (req, res, next) => {

  // Create newUser object from the User model
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err){
      res.json({success: false, msg: "Failed to rergister user"});
    }else {
      res.json({success: true, msg: "User registed success"});
    }
  });

});

// Register the AUTHENTICATE route
router.post('/authenticate', (req, res, next) => {
  res.send('AUTHENTICATE')
});

// Register the PROFILE route -- This route will be our auth token page
router.get('/profile', (req, res, next) => {
  res.send('PROFILE')
});

// Export the router for use
module.exports = router;
