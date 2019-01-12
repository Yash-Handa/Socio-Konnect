const authChecker = require('../../middlewares/auth/auth');
const User = require('../../DB/schema');

module.exports = router => {
  router.get('/logout', authChecker, (req, res) => {
    req.logOut();
    req.flash('success_msg', 'You are logged out');
    res.status(301).redirect('/');
  });

  router.get('/remove', authChecker, (req, res, next) => {
    User.findOneAndRemove({ email: req.user.email }).exec()
      .then(user => {
        user.remove();
        req.flash('success_msg', `${user.email} has been Deleted`);
        req.logOut();
        res.status(301).redirect('/');
      })
      .catch(err => next(err));
  });
};
