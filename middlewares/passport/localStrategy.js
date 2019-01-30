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

          if (user.provider !== 'local') {
            return done(null, false, {
              message: `The email is registered with, ${user.provider.toUpperCase()} sign in`,
            });
          }

          // match password
          bcryptjs.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err);

            // return user
            if (isMatch) {
              // check if email is confirmed or not
              if (user.confirmed) {
                if (user.firstTime) {
                  user.set({ firstTime: false });
                  user.save((error) => {
                    if (error) {
                      return done(null, false, {
                        message: 'Unexpected Error Occurred',
                      });
                    }
                    // send user rather than updatedUser so that first time can be accessed
                    return done(null, user);
                  });
                } else {
                  return done(null, user);
                }
              }

              const createdDate = user.date.getTime();
              const now = Date.now();
              // get total seconds between the times
              const delta = Math.abs(now - createdDate) / 1000;
              const hours = Math.floor(delta / 3600);
              if (user.confirmed === false && hours > 1) {
                user.remove();
                return done(null, false, {
                  message: 'Register again because you didn\'t verify your Email',
                });
              }
              return done(null, false, {
                message: 'Verify your email to Login',
              });
            }

            return done(null, false, {
              message: 'Incorrect password.',
            });
          });
        })
        .catch(err => done(err));
    },
  ));
};
