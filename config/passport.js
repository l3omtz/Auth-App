const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

// MLab connetion
const mongojs = require('mongojs');
const db = mongojs('mongodb://admin:admin@ds155428.mlab.com:55428/tiktalk2go', ['users']);

/* Make sure to include in app.js */

// Create passport function to be accessed anywhere
module.exports = function(passport){
  let opts = {}; // <- empty options object
  // Get token from header
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  // Get secret key from our config db file
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => { // <- callback will give us payload
    // console.log(jwt_payload);
     // Call model user  ID
    db.users.findOne({_id: mongojs.ObjectId(jwt_payload._id)},(err, user) =>{

      if(err){
        return done(err, false); // <- If error return done err and false
      }
      if(user){
        return done(null, user); // <- If user is found retunr done, and pass user back
      }else{
        return done(null, false); // <- If no user return done with error
      }
    });
  }));
}

/* Make sure to include in app.js */
