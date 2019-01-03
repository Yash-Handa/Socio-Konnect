const express = require('express');
// const saveUser = require('../DB/createUsers');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/login', (req, res) => {
  res.status(200).send('Welcome to login');
});

router.get('/register', (req, res) => {
  res.status(200).send('Welcome to register');
});

module.exports = router;
