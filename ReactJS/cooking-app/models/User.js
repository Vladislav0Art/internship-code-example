const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  wishlist: {
    type: Array,
    default: []
  },
  avatarLink: {
    type: String,
    default: ''
  },
  descr: {
    type: String,
    default: ''
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});


module.exports = User = mongoose.model('user', UserSchema);