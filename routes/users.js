const express = require('express');
// const saveUser = require('../DB/createUsers');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/login', (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
    csrfToken: req.csrfToken(),
  });
});

router.post('/login', (req, res) => {
  res.status(200).send('hello');
});

router.get('/register', (req, res) => {
  res.status(200).render('register', {
    title: 'Register',
    csrfToken: req.csrfToken(),
  });
});

module.exports = router;
