const GitHubStrategy = require('passport-github').Strategy;

const config = require('../../bin/config/config');
const User = require('../../DB/schema');

function extras(data, token) {
  const user = {};
  user.picture = data.avatar_url;
  user.accessToken = token;
  user.id = data.id;
  user.node = data.node_id;
  user.profile = data.html_url;
  user.location = data.location;
  user.public_repos = data.public_repos;
  user.followers = data.followers;
  user.following = data.following;
  return user;
}

module.exports = passport => {
  passport.use(new GitHubStrategy(
    {
      clientID: config.githubId,
      clientSecret: config.githubSecret,
      callbackURL: `${config.host}/auth/github/callback`,
      scope: 'user:email',
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      // done(null, profile);

      // check if email exist in the github id or not
      if (profile.emails.length === 0) {
        return done(null, false, {
          message: 'No email is Registered with your Github account or it\'s not Public',
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
              github: extras(profile._json, accessToken),
            });

            createUser.save((err, savedUser) => {
              if (err) return done(err);
              done(null, savedUser);
            });
          } else if (user.github) {
            // eslint-disable-next-line eqeqeq
            if (user.github.id == profile.id) return done(null, user);
          } else {
            // when email is present but not registered with github
            return done(null, false, {
              message: `The email is registered with, ${user.provider.toUpperCase()} sign in`,
            });
          }
        })
        .catch(err => done(err));
    },
  ));
};
