const mongoose = require('mongoose');

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
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  google: {},
  facebook: {},
  twitter: {},
  github: {},
  linkedin: {},
  pinterest: {},
  instagram: {},
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;
