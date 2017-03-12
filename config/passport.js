// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const User = require('../models/user');
// const config = require('../config/database');


const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

/* Make sure to include in app.js */

// Create passport function to be accessed anywhere
module.exports = function(passport){
  let opts = {}; // <- empty options object
  // Get token from header
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  // Get secret key from our config db file
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => { // <- callback will give us payload
    console.log(jwt_payload);
    // Call model user  ID
    User.getUserById(jwt_payload._doc._id, (err, user) =>{ // <-- come back to this
      if(err){
        return done(err, false); // <- If error return done err and false
      }
      if(user){
        return done(null, user); // <- If user is found retunr done, and pass user back
      }else{
        return done(null, err); // <- If no user return done with error
      }
    });
  }));
}
