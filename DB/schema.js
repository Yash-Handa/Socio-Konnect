const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  confirmed: {
    type: Boolean,
    default: true,
  },
  google: {},
  facebook: {},
  twitter: {},
  github: {},
  linkedin: {},
  pinterest: {},
  instagram: {},
});


// takes in a pass and return a promise with the hash or an error.
function encryptPass(pass) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(pass, salt, (error, hash) => {
        if (err) reject(error);
        resolve(hash);
      });
    });
  });
}

userSchema.methods.encryptPass = encryptPass;

const Users = mongoose.model('users', userSchema);

module.exports = Users;
