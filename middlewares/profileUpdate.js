// Use this middleware for saving updates to the middleware
const User = require('../DB/schema');

module.exports = (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  User.findByIdAndUpdate(req.user._id, {
    $set: {
      username: req.body.username,
      profilePic: req.body.profilePic,
    },
  }, (err) => {
    if (err) return next(err);
    req.flash('introAgain', req.body.firstTime);
    return next();
  });
};
