const debug = require('debug')('express-dev-env:createUser');

const User = require('./schema.js');

module.exports = (fName, lName) => {
  const user = new User({
    firstName: fName,
    lastName: lName,
  });

  return new Promise((resolve, reject) => {
    user.save((err) => {
      if (err) {
        debug(err);
        reject(err);
      }
      resolve(user);
    });
  });
};
