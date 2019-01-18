const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('../../bin/config/config');
const User = require('../../DB/schema');

function extras(data, token) {
  const user = {};
  user.profile = data.profile;
  user.picture = data.picture;
  // user.gender = data.gender;
  // user.locale = data.locale;
  user.accessToken = token;
  user.id = data.sub;
  return user;
}

module.exports = passport => {
  passport.use(new GoogleStrategy({
    clientID: config.googleId,
    clientSecret: config.googleSecret,
    callbackURL: `${config.host}/auth/google/callback`,
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    // console.log(JSON.stringify(profile, undefined, 2));
    // return done(null, profile);

    // check if it is an authorizing call (user already exist and login)
    if (req.user) {
      User.findOne({ email: req.user.email }).exec()
        .then(user => {
          // eslint-disable-next-line no-underscore-dangle
          user.set({ google: extras(profile._json, accessToken) });
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
      // check if email exist in the google id or not
      if (profile.emails.length === 0) {
        return done(null, false, {
          message: 'No email is Registered with your Google account',
        });
      }

      // check if the email is verified by the google
      if (profile.emails[0].verified === false) {
        return done(null, false, {
          message: `Verify your email ${profile.emails[0].value} with Google`,
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
              google: extras(profile._json, accessToken),
            });

            createUser.save((err, savedUser) => {
              if (err) return done(err);
              done(null, savedUser);
            });
          } else if (user.google.id === profile.id) return done(null, user);
          else {
            // when email is present but not registered with facebook
            return done(null, false, {
              message: `The email is registered with, ${user.provider.toUpperCase()} sign in`,
            });
          }
        })
        .catch(err => done(err));
    }
  }));
};
