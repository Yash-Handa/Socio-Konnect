const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;
