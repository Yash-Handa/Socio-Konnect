const express = require('express');
const debug = require('debug')('SignIn-SignUp:user');

const validator = require('../middlewares/users/validator');
const saveUser = require('../DB/createUsers');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.get('/login', (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
    csrfToken: req.csrfToken(),
    success_msg: res.locals.success_msg,
    error_msg: res.locals.error_msg,
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

router.post('/register', validator, (req, res, next) => {
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
    saveUser(req.body.username, req.body.email, req.body.password)
      .then(() => {
        req.flash('success_msg', 'You are registered and can logIn');
        res.status(304).redirect('/users/login');
      })
      .catch(err => {
        debug(err);
        next(err);
      });
  }
});

module.exports = router;
