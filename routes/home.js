const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('PROFILE')
});


// Export the router for use
module.exports = router;
