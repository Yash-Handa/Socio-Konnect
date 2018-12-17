const express = require('express');
const saveUser = require('../DB/createUsers');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

// Example of saving data in database from parameter
router.get('/:fName-:lName', (req, res, next) => {
  saveUser(req.params.fName, req.params.lName)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      // error handling which sends control to global error handling middleware in app.js
      next(err);
    });
});

// Example of next('route')
router.get('/:id', (req, res, next) => {
  if (req.params.id === '0') {
    next('route');
  } else {
    res.send('regular');
  }
});

router.get('/:id', (req, res) => {
  res.send('special');
});


module.exports = router;
