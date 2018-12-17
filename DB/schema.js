const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: {
    type: String,
    validate: {
      validator(name) {
        return name.length > 2;
      },
      message: 'Name must be longer than 2 characters',
    },
    required: [true, 'A user name is REQUIRED'],
  },
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;
