const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const config = require('../../bin/config/config');
const User = require('../../DB/schema');

function extras(data, token) {
  const user = {};
  user.profile = data.profile;
  user.picture = data.picture;
  user.gender = data.gender;
  user.locale = data.locale;
  user.accessToken = token;
  return user;
}

module.exports = passport => {
  passport.use(new GoogleStrategy({
    clientID: config.googleId,
    clientSecret: config.googleSecret,
    callbackURL: 'http://localhost:1998/auth/google/callback',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    // return done(null, profile);

    // check if email exist in the google id or not
    if (profile.emails.length === 0) {
      return done(null, undefined, {
        message: 'No email is Registered with Google',
      });
    }

    // check if the email is verified by the google
    if (profile.emails[0].verified === false) {
      return done(null, undefined, {
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
            // eslint-disable-next-line no-underscore-dangle
            req.from = 'register';
            done(null, savedUser);
          });
        } else {
          req.from = 'login';
          done(null, user);
        }
      })
      .catch(err => done(err));
  }));
};
