// Bring in express
const express = require('express');

// Brinf in the router
const router = express.Router();

// Register the REGISTER route
router.get('/register', (req, res, next) => {
  res.send('REGISTER USER')
});

// Register the AUTHENTICATE route
router.get('/authenticate', (req, res, next) => {
  res.send('AUTHENTICATE')
});

// Register the PROFILE route -- This route will be our auth token page
router.get('/profile', (req, res, next) => {
  res.send('PROFILE')
});

// Register the VALIDATE route -- This route will validate our token
router.get('/validate', (req, res, next) => {
  res.send('VALIDATE')
});

// Export the router for use
module.exports = router;
