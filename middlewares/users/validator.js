const User = require('../../DB/schema');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  let {
    username,
    email,
    password,
    // eslint-disable-next-line prefer-const
    rePass,
  } = req.body;

  req.body.username = username.trim();
  req.body.email = email.trim();
  req.body.password = password.trim();

  username = username.trim();
  email = email.trim();
  password = password.trim();

  req.errors = [];

  // check for all present
  if (!username || !email || !password || !rePass) req.errors.push({ msg: 'Please fill in all the fields' });

  // check username length 3 characters
  if (username.length < 3) req.errors.push({ msg: 'Invalid Username' });

  // check passwords match
  if (password !== rePass) req.errors.push({ msg: 'Passwords do not match' });

  // check password length 6 characters
  if (password.length < 6) req.errors.push({ msg: 'Password too weak' });

  // making requests faster
  if (req.errors.length > 0) return next();

  User.findOne({ email }).exec()
    .then(data => {
      if (data) {
        req.errors.push({ msg: 'Email Already registered' });
      }
      return next();
    })
    .catch(err => next(err));
};
