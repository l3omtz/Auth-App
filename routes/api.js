const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

// MLab connetion
const mongojs = require('mongojs');
const db = mongojs('mongodb://admin:admin@ds155428.mlab.com:55428/tiktalk2go', ['users']);

// Bring in user model from user.js
const User = require('../models/user');

router.get('/', (req, res) => {
  res.send('api works');
});

// Get all users /users/
router.get('/getall', (req, res, next) => {
  db.users.find((err, users) => {
    if(err){
      res.send(err);
      console.log("error here")
    }
    res.json(users);
    console.log(users);
  });
});

// Get single user
router.get('/:id', (req, res, next) => {
  db.users.findOne({_id: mongojs.ObjectId(req.params.id)},(err, user) => {
    if(err){
      res.send(err);
    }
    res.json(user);
  });
});

// Save User with hash password -- mLab
router.post('/adduser', (req,res,next) =>{
  var user = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    // b. Call in the password from new user
    bcrypt.hash(user.password, salt, (err, hash) =>{
      if(err) throw err;
      // c. Make w/e password gave in form and make it to hash
      user.password = hash;

      db.users.save(user, (err, user) =>{
        if(err){
          res.send(err);
        }
          res.json(user)
      });

    });
  });
});

// Register the AUTHENTICATE route - (2) Authenticate user login with password
router.post('/authenticate', (req, res, next) => {
  // a. Get username that was submited from form
  const username = req.body.username;
  // b. Get password that was submited from form
  const password = req.body.password;
  const query = {username: username} // <- Query username of username

  // c. Get user by the username -- function created in user.js
  db.users.find(query, (err, user) => {
    console.log(user);// <- User given back from database
    console.log(user[0].username);
    if(err) throw err; // <- If thers an error return errro
    if(!user[0].username) // <- If theres not a user that was inputed from form return not found message
      return res.json({success: false, msg: 'USER NOT FOUND'});

    // ELSE If user IS FOUND compare password that was inputed with the hash passowrd return from callback(err, user)
    bcrypt.compare(password, user[0].password, (err, isMatch) =>{
      if(err) throw err;

      if(isMatch){
        // If passwords match create token with jwt.sign() function
        const token = jwt.sign(user[0], config.secret, { // <- taken in the user object and the secret form congif
          expiresIn:604800 // 1 week in sec - how long token is good for, then logs out after time expires
        });

        //  Our respose to our front end so profile data can be displayed
        res.json({
          success: true,
          token: 'JWT ' +token,  // <- Send token because user was able to login
          user:{                // <- Building own user object so password wont be sent back
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });

      }else{
        return res.json({success: false, msg: 'WRONG PASSWORD'});
      }
    });
  });
});

// Delete User
router.delete('/:id', (req, res, next) => {
  db.users.remove({_id: mongojs.ObjectId(req.params.id)},(err, user) => {
    if(err){
      res.send(err);
    }
    res.json(user);
  });
});

// Update
router.put('/:id', (req, res, next) => {
  var user = req.body;
  var updateUser = {};

  if(user.isDone){
    updateUser.isDone = user.isDone;
  }
  if(user.title){
    updateUser.title = user.title;
  }

  if(!updateUser){
    res.status(4004);
    res.json({
      "error" : "Bad data"
    })
  }else{
    db.users.update({_id: mongojs.ObjectId(req.params.id)},updateUser, {} ,(err, user) => {
      if(err){
        res.send(err);
      }
      res.json(user);
    });
  }

});


















// Register the REGISTER route -- (1) Resgister new user
router.post('/test1', (req, res, next) => {
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
router.post('/test2', (req, res, next) => {
  // ** -> Not using req.body.username/password, it wont read form postman <- ** //

  // a. Get username that was submited from form
  const username = "l3omtz";
  // b. Get password that was submited from form
  const password = "l3omtz20";

  // c. Get user by the username -- function created in user.js
  User.getUserByUsername(username, (err, user) => {  // <- User given back from database
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
          token: 'JWT ' +token,  // <- Send token because user was able to login
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
// router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
//   res.json({user: req.user});
// });



// Export the router for use
module.exports = router;
