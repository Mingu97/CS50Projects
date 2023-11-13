var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  session: {
    type: String,
    default: null,
  },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
