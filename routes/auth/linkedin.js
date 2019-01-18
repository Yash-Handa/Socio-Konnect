const passport = require('passport');

module.exports = router => {
  router.get('/linkedin',
    passport.authenticate('linkedin'));

  router.get('/linkedin/callback', (req, res, next) => {
    passport.authenticate('linkedin', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) {
        req.flash('error_msg', info.message);
        // for authorizing call (user already exist and login)
        if (req.isAuthenticated()) return res.redirect('/dashboard#linkedin');
        return res.redirect('/auth/login');
      }

      // for authorizing call (user already exist and login)
      if (req.isAuthenticated()) return res.redirect('/dashboard#linkedin');

      req.logIn(user, error => {
        if (error) { return next(err); }
        return res.redirect('/dashboard#linkedin');
      });
    })(req, res, next);
  });
};
