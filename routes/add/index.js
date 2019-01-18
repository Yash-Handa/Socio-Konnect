const express = require('express');
const passport = require('passport');
const authChecker = require('../../middlewares/auth/auth');

const router = express.Router();

router.use(authChecker);

router.post('/facebook',
  passport.authorize('facebook', {
    scope: ['public_profile', 'email'], // 'user_link' for public profile and 'user_gender' for gender
  }));

router.post('/google',
  passport.authorize('google', {
    scope: ['profile', 'email'],
  }));

router.post('/github',
  passport.authorize('github'));

router.post('/twitter', (req, res) => {
  res.send('twitter');
});

router.post('/linkedin',
  passport.authorize('linkedin'));

router.post('/pinterest',
  passport.authorize('pinterest'));

router.get('/pinterest/callback', (req, res, next) => {
  passport.authenticate('pinterest', {
    successRedirect: '/dashboard#pinterest',
    failureRedirect: '/dashboard#pinterest',
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
