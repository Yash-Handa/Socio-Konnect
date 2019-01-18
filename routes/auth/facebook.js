const passport = require('passport');

module.exports = router => {
  router.get('/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email'], // 'user_link' for public profile and 'user_gender' for gender
    }));

  router.get('/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        req.flash('error_msg', info.message);
        // for authorizing call (user already exist and login)
        if (req.isAuthenticated()) return res.redirect('/dashboard#facebook');
        return res.redirect('/auth/login');
      }

      // for authorizing call (user already exist and login)
      if (req.isAuthenticated()) return res.redirect('/dashboard#facebook');

      req.logIn(user, error => {
        if (error) { return next(err); }
        return res.redirect('/dashboard#facebook');
      });
    })(req, res, next);
  });
};
