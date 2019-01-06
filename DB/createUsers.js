const debug = require('debug')('express-dev-env:createUser');

const User = require('./schema.js');

module.exports = (username, email, password) => {
  const user = new User({
    username,
    email,
    confirmed: false,
  });

  return new Promise((resolve, reject) => {
    user.encryptPass(password)
      .then(hash => {
        user.password = hash;
        return 0;
      })
      .then(() => {
        user.save((err) => {
          if (err) {
            debug(err);
            reject(err);
          }
          resolve(user);
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};
