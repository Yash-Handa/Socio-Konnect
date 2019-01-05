// Use this middleware on every resource that requires user login to view

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    // req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    req.flash('error_msg', 'Please login to view the resource');
    res.redirect('/users/login');
  }
};
