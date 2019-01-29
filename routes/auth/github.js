const passport = require('passport');

module.exports = router => {
  router.get('/github',
    passport.authenticate('github'));

  router.get('/github/callback', (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
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
