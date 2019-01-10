const passport = require('passport');

module.exports = router => {
  router.get('/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email'], // 'user_link' for public profile and 'user_gender' for gender
    }));

  // router.get('/facebook', passport.authenticate('facebook'));

  router.get('/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', {
      successRedirect: '/dashboard',
      failureRedirect: '/auth/login',
      failureFlash: true,
    })(req, res, next);
  });
};
