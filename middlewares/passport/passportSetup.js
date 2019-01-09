const passport = require('passport');
const User = require('../../DB/schema');

// strategies
const local = require('./localStrategy');
const google = require('./googleStrategy');

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  // strategies
  local(passport);
  google(passport);

  // serializing users after the strategies are loaded
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // de serializing the user
  passport.deserializeUser((id, done) => {
    User.findById(id).exec()
      .then(user => done(null, user))
      .catch(err => done(err));
  });
};
