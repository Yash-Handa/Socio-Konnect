const LocalStrategy = require('passport-local').Strategy;
const bcryptjs = require('bcryptjs');
const User = require('../../DB/schema');

module.exports = function (passport) {
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
    },
    (email, password, done) => {
      User.findOne({ email }).exec()
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: 'Email not registered',
            });
          }

          // match password
          bcryptjs.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err);

            // return user
            if (isMatch) return done(null, user);

            return done(null, false, {
              message: 'Incorrect password.',
            });
          });
        })
        .catch(err => done(err));
    },
  ));
};
