const passport = require('passport');

module.exports = router => {
  router.get('/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }));

  router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        req.flash('error_msg', info.message);
        // for authorizing call (user already exist and login)
        if (req.isAuthenticated()) return res.redirect('/dashboard');
        return res.redirect('/auth/login');
      }

      // for authorizing call (user already exist and login)
      if (req.isAuthenticated()) return res.redirect('/dashboard');

      req.logIn(user, error => {
        if (error) { return next(err); }
        return res.redirect('/dashboard');
      });
    })(req, res, next);
  });
};
