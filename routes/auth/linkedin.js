const passport = require('passport');

module.exports = router => {
  router.get('/linkedin',
    passport.authenticate('linkedin'));

  router.get('/linkedin/callback', (req, res, next) => {
    passport.authenticate('linkedin', {
      successRedirect: '/dashboard',
      failureRedirect: '/auth/login',
      failureFlash: true,
    })(req, res, next);
  });
};
