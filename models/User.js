const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  elo: {
    type: Number,
    default: 1000
  },
  admin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;