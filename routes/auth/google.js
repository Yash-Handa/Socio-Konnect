const passport = require('passport');

module.exports = router => {
  router.get('/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }));

  router.get('/google/callback',
    passport.authenticate('google', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true,
    }));
};
