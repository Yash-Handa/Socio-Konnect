const jwt = require('jsonwebtoken');

const secret = require('../../bin/config/config').jwtSecret;
const User = require('../../DB/schema');

module.exports = {
  // for jwt creation
  jwtCreator(req, res, next) {
    const { email } = res.locals;
    const jwtKey = res.locals.jwt;
    if (jwtKey) return next();
    if (!email) return next(new Error('You shouldn\'t refresh the page Now the Email is lost, No more mails can be send :('));

    // create jwt
    jwt.sign({
      email,
    }, secret, { expiresIn: '1h' }, (err, token) => {
      if (err) return next(err);
      res.locals.jwt = token;
      return next();
    });
  },

  // for sending mails
  sender(req, res, next) {
    const { email } = res.locals;
    const jwtKey = res.locals.jwt;
    if (!email || !jwtKey) {
      return next(new Error('You shouldn\'t refresh the page Now the Email is lost, No more mails can be send :('));
    }

    if (jwtKey && email) {
      // now send mail.
      next();
    }
  },

  // for the jwt route
  checker(req, res, next) {
    jwt.verify(req.params.jwt, secret, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          // redirect to register
          req.flash('error_msg', 'Register again because verification time is over');
          res.status(304).redirect('/users/register');
        }
        next(err);
      }

      // if no error occurs
      User.findOne({ email: decoded.email }).exec()
        .then(user => {
          if (user) {
            user.set({ confirmed: true });
            user.save((error, updatedUser) => {
              if (error) next(err);
              req.flash('success_msg', 'You are Verified and can logIn');
              req.flash('email', updatedUser.email);
              res.status(304).redirect('/users/login');
            });
          } else {
            // redirect to register with no user found
            req.flash('email', decoded.email);
            req.flash('error_msg', 'No such user exist Please Register');
            res.status(304).redirect('/users/register');
          }
        })
        .catch(error => next(error));
    });
  },
};
