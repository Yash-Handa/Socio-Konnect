const FacebookStrategy = require('passport-facebook').Strategy;

const config = require('../../bin/config/config');
const User = require('../../DB/schema');

function extras(data, token) {
  const user = {};
  user.picture = data.picture.data.url;
  user.accessToken = token;
  user.id = data.id;
  return user;
}

module.exports = passport => {
  passport.use(new FacebookStrategy(
    {
      clientID: config.facebookId,
      clientSecret: config.facebookSecret,
      callbackURL: `${config.host}/auth/facebook/callback`,
      profileFields: ['id', 'gender', 'link', 'displayName', 'picture', 'email', 'name'],
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      // console.log(JSON.stringify(profile, undefined, 2));
      // done(null, profile);

      // check if it is an authorizing call (user already exist and login)
      if (req.user) {
        User.findOne({ email: req.user.email }).exec()
          .then(user => {
            // eslint-disable-next-line no-underscore-dangle
            user.set({ facebook: extras(profile._json, accessToken) });
            user.save((err, updatedUser) => {
              if (err) {
                return done(null, false, {
                  message: 'Unexpected Error Occurred',
                });
              }
              return done(null, updatedUser);
            });
          })
          .catch(() => done(null, false, {
            message: 'Unexpected Error Occurred',
          }));
      } else {
        // check if email exist in the facebook id or not
        if (profile.emails.length === 0) {
          return done(null, false, {
            message: 'No email is Registered with your Facebook account',
          });
        }

        User.findOne({ email: profile.emails[0].value }).exec()
          .then(user => {
            // create new user
            if (!user) {
              const createUser = new User({
                username: profile.displayName,
                email: profile.emails[0].value,
                provider: profile.provider,
                // eslint-disable-next-line no-underscore-dangle
                facebook: extras(profile._json, accessToken),
              });

              createUser.save((err, savedUser) => {
                if (err) return done(err);
                done(null, savedUser);
              });
            } else if (user.facebook) {
              if (user.facebook.id === profile.id) return done(null, user);
            } else {
              // when email is present but not registered with facebook
              return done(null, false, {
                message: `The email is registered with, ${user.provider.toUpperCase()} sign in`,
              });
            }
          })
          .catch(err => done(err));
      }
    },
  ));
};
