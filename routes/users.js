const express = require('express');
const debug = require('debug')('SignIn-SignUp:user');
const passport = require('passport');

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
    email: res.locals.email,
    success_msg: res.locals.success_msg,
    error_msg: res.locals.error_msg,
    error: res.locals.error,
  });
});

router.post('/login',
  (req, res, next) => {
    // for sending email with re-direct
    req.flash('email', req.body.email);
    next();
  },
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  }));

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
        req.flash('email', req.body.email);
        res.status(304).redirect('/users/login');
      })
      .catch(err => {
        debug(err);
        next(err);
      });
  }
});

router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success_msg', 'You are logged out');
  res.status(301).redirect('/users/login');
});

module.exports = router;
