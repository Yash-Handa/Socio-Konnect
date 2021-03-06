const express = require('express');
const debug = require('debug')('SocioKonnect:user');
const passport = require('passport');

const validator = require('../../middlewares/auth/validator');
const saveUser = require('../../DB/createUsers');
const logOutRemove = require('./logOutRemove');

// auth and logins
const emailVerifier = require('./email');
const googleAuth = require('./google');
const facebookAuth = require('./facebook');
const githubAuth = require('./github');
const linkedinAuth = require('./linkedin');

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
    failureRedirect: '/auth/login',
    failureFlash: true,
  }));

router.get('/register', (req, res) => {
  res.status(200).render('register', {
    title: 'Register',
    csrfToken: req.csrfToken(),
    email: res.locals.email,
    error_msg: res.locals.error_msg,
    error: res.locals.error,
    success_msg: res.locals.success_msg,
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
        req.flash('email', req.body.email);
        res.status(304).redirect('/auth/emailPrompt');
      })
      .catch(err => {
        debug(err);
        next(err);
      });
  }
});

logOutRemove(router);

emailVerifier(router);
googleAuth(router);
facebookAuth(router);
githubAuth(router);
linkedinAuth(router);

module.exports = router;
