const TwitterStrategy = require('passport-twitter').Strategy;

const config = require('../../bin/config/config');
const User = require('../../DB/schema');

function extras(data, token, tokenSecret) {
  const user = {};
  user.picture = data.profile_image_url_https;
  user.token = token;
  user.tokenSecret = tokenSecret;
  user.id = data.id;
  user.profile = `https://twitter.com/${data.screen_name}`;
  return user;
}

module.exports = passport => {
  passport.use(new TwitterStrategy(
    {
      consumerKey: config.twitterId,
      consumerSecret: config.twitterSecret,
      callbackURL: `${config.host}/add/twitter/callback`,
      passReqToCallback: true,
    },
    (req, token, tokenSecret, profile, done) => {
      // console.log(JSON.stringify(profile, undefined, 2));
      // done(null, req.user);

      if (req.user) {
        User.findOne({ email: req.user.email }).exec()
          .then(user => {
            // eslint-disable-next-line no-underscore-dangle
            user.set({ twitter: extras(profile._json, token, tokenSecret) });
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
        return done(null, false, {
          message: 'User is not Logged in',
        });
      }
    },
  ));
};
