const express = require('express');
const validator = require('../middlewares/users/validator');
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
  // use this if block if validation fails
  if (true) {
    res.status(200).render('login', {
      title: 'Login',
      csrfToken: req.csrfToken(),
      email: req.body.email,
    });
  }
});

router.get('/register', (req, res) => {
  res.status(200).render('register', {
    title: 'Register',
    csrfToken: req.csrfToken(),
  });
});

router.post('/register', validator, (req, res) => {
  console.log(req.body);
  // use this if block if validation fails
  if (req.errors.length > 0) {
    res.status(200).render('register', {
      title: 'Register',
      csrfToken: req.csrfToken(),
      email: req.body.email,
      username: req.body.username,
      errors: req.errors,
    });
  } else {
    res.status(200).json(req.body);
  }
});

module.exports = router;
