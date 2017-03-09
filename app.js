// Bring in all modules required
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// Create mongo database
const mongooseDB = 'mongodb://admin:admin@ds155428.mlab.com:55428/tiktalk2go';
// Connect to database with mongoose
mongoose.connect(mongooseDB);

var conn = mongoose.connection;
// On connection
conn.on('connected', () =>{
  console.log("connected to database");
});
// On error
conn.on('error', console.error.bind(console, 'connection error:'));

// Init our app variable through express
const app = express();

// Users routes file
const users = require('./routes/users');

// var for port we want to use
const port = 3000;

// Cors middleware -- For server on diffrent domains
app.use(cors());

// Set static Angular folder ** Replaces & joins to our client side **
app.use(express.static(path.join(__dirname, 'client')));

// Body parser middleware -- parses json for us to use
app.use(bodyParser.json());

// Any routes with users will go to usres/ link
app.use('/users', users)

// Create Index start route
app.get('/', (req, res, err) => {
  res.send('Invalid Endpoints');
});

// Call app var to listen to our port -- Starts Server
app.listen(port, () => {
  console.log('Server started on port ' +port );
});
