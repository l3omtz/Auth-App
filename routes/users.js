const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Bring in user model from user.js
const User = require('../models/user');

// Register the REGISTER route -- (1) Resgister new user
router.post('/register', (req, res, next) => {
  // Create newUser object from the User model that we inported
  let newUser = new User({
    name: req.body.name, // <- From what is being posted: name = request, from body, find name
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  // Add user to DB, pass in newUser object
  User.addUser(newUser, (err, user) => {
    if (err){
      res.json({success: false, msg: "Failed to rergister user"});
    }else {
      res.json({success: true, msg: "User registed success"});
    }
  });
});

// Register the AUTHENTICATE route - (2) Authenticate user login with password
router.post('/authenticate', (req, res, next) => {
  // ** -> Not using req.body.username/password, it wont read form postman <- ** //

  // a. Get username that was submited from form
  const username = "l3omtz";
  // b. Get password that was submited from form
  const password = "l3omtz20";

  // c. Get user by the username -- function created in user.js
  User.getUserByUsername(username, (err, user) => {  // <- User given back when called from database
    if(err) throw err; // <- If thers an error return errro
    if(!user) // <- If theres not a user that was inputed from form return not found message
      return res.json({success: false, msg: 'USER NOT FOUND'});

    // If user if found compare password that was inputed with the hash passowrd return from callback(err, user)
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        // If passwords match create token with jwt.sign() function
        const token = jwt.sign(user, config.secret, { // <- taken in the user object and the secret form congif
          expiresIn:604800 // 1 week in sec - how long token is good for, then logs out after time expires
        });
        //  Our respose to our front end so profile data can be displayed
        res.json({
          success: true,
          token: 'JWT' +token,  // <- Send token because user was able to login
          user:{                // <- Building own user object so password wont be sent back
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'WRONG PASSWORD'});
      }
    });
  });

}); // End Authenticate .post

// Register the PROFILE route -- This route will be our auth token page
router.get('/profile', (req, res, next) => {
  res.send('PROFILE')
});

// Export the router for use
module.exports = router;
