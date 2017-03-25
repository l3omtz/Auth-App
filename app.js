// Bring in all modules required
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');


// Users routes file
const api = require('./routes/api');

// Init our app variable through express
const app = express();

// var for port we want to use || 3000
const port = process.env.PORT || 8080;

// Cors middleware -- For server on diffrent domains
// app.use(cors());

// Set static Angular folder ** Replaces & joins to our client side **
app.use(express.static(path.join(__dirname, 'dist')));

// Body parser middleware -- parses json for us to use
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Any routes with users will go to usres/ link
app.use('/api', api)

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


// Call app var to listen to our port -- Starts Server
app.listen(port, () => {
  console.log('Server started on port ' +port );
});
