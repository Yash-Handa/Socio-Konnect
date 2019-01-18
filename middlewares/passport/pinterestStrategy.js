// This strategy is only for authorizing(connecting) not for authenticating(registration)

const PinterestStrategy = require('passport-pinterest').Strategy;

const config = require('../../bin/config/config');
const User = require('../../DB/schema');

function extras(data, token) {
  const user = {};
  user.picture = data.data.image['60x60'].url;
  user.accessToken = token;
  user.id = data.id;
  user.profile = data.data.url;
  return user;
}

module.exports = passport => {
  passport.use(new PinterestStrategy(
    {
      clientID: config.pinterestId,
      clientSecret: config.pinterestSecret,
      scope: ['read_public'],
      callbackURL: `${config.host}/add/pinterest/callback`,
      state: true,
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      console.log(JSON.stringify(req.user, undefined, 2));
      // done(null, req.user);

      if (req.user) {
        console.log('hello');
        User.findOne({ email: req.user.email }).exec()
          .then(user => {
            console.log(1, user);
            // eslint-disable-next-line no-underscore-dangle
            user.set({ pinterest: extras(profile._json, accessToken) });
            user.save((err, updatedUser) => {
              if (err) {
                return done(null, false, {
                  message: 'Unexpected Error Occurred',
                });
              }
              console.log(2, updatedUser);
              return done(null, updatedUser);
            });
          })
          .catch((err) => {
            console.log(err);
            return done(null, false, {
              message: 'Unexpected Error Occurred',
            });
          });
      } else {
        return done(null, false, {
          message: 'User is not Logged in',
        });
      }
    },
  ));
};
