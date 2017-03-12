const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

const db = mongojs('mongodb://admin:admin@ds155428.mlab.com:55428/tiktalk2go', ['users']);



router.get('/', (req, res, next) => {
  db.users.find( (err, users) => {
    if (err) throw err;
    res.json(users);
  });
});


// Export the router for use
module.exports = router;
