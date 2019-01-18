const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const config = require('../../bin/config/config');
const User = require('../../DB/schema');

function extras(data, token) {
  const user = {};
  user.picture = data.pictureUrl;
  user.accessToken = token;
  user.id = data.id;
  user.profile = data.publicProfileUrl;
  // user.location = data.location;
  // user.positions = data.positions;
  // user.numConnections = data.numConnections;
  // user.industry = data.industry;
  // user.headline = data.headline;
  return user;
}

module.exports = passport => {
  passport.use(new LinkedInStrategy(
    {
      clientID: config.linkedinId,
      clientSecret: config.linkedinSecret,
      callbackURL: `${config.host}/auth/linkedin/callback`,
      scope: ['r_emailaddress', 'r_basicprofile'],
      state: true,
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      // console.log(JSON.stringify(profile, undefined, 2));
      // done(null, profile);

      // check if email exist in the linkedin id or not
      if (profile.emails.length === 0) {
        return done(null, false, {
          message: 'No email is Registered with your LinkedIn account',
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
              linkedin: extras(profile._json, accessToken),
            });

            createUser.save((err, savedUser) => {
              if (err) return done(err);
              done(null, savedUser);
            });
          } else if (user.linkedin) {
            // eslint-disable-next-line eqeqeq
            if (user.linkedin.id == profile.id) return done(null, user);
          } else {
            // when email is present but not registered with linkedin
            return done(null, false, {
              message: `The email is registered with, ${user.provider.toUpperCase()} sign in`,
            });
          }
        })
        .catch(err => done(err));
    },
  ));
};
