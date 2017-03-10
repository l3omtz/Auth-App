const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const congif = reqire('../models/database');

// Create user Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true 
  },
  username:{
    type: String,
    required: true
  },
  password {
    type: String,
    required: true
  }
});

// Create global var for user -- export model with user of type UserSchema
const User = module.exports.mongoose.model('User', UserSchema);

// Create functions to call outside this file
module.exports.getUserById = function(id, callback){ // <- Takes in id and callback
  User.findById(id, callback); // <- Referse to the User we created & calls the findById mongoose function
}
module.exports.getUserByUsername = function(username, callback){ // <- Takes in username and callback
  const query = {username:username} // <- Query username of username
  User.findOne(query, callback); // <- Calls the findOne function which takes in a query
}
