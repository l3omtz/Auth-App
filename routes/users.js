// Bring in express
const express = require('express');

// Brinf in the router
const router = express.Router();

// Register the REGISTER route
router.post('/register', (req, res, next) => {
  res.send('REGISTER USER')
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
