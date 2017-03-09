// Bring in all modules required
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// Init our app variable through express
const app = express();

// var for port we want to use
const port = 3000;

// Cors middleware -- For server on diffrent domains
app.use(cors());

// Body parser middleware -- parses json for us to use
app.use(bodyParser.json());

// Create Index start route
app.get('/', (req, res, err) => {
  res.send('Invalid Endpoint');
});

// Call app var to listen to our port -- Starts Server
app.listen(port, () => {
  console.log('Server started on port ' +port );
});
