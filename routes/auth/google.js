const passport = require('passport');

module.exports = router => {
  router.get('/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }));

  router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', {
      successRedirect: '/dashboard',
      failureRedirect: '/auth/login',
      failureFlash: true,
    })(req, res, next);
  });
};
