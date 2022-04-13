const mongoose = require('mongoose');
const expireTime = require('../config/default.json').jwt.tokens.refresh.expiresIn;
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
  tokenId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  createdAt: { 
    type: Date,
    expires: expireTime, // config value
    default: Date.now 
  }
});


module.exports = RefreshToken = mongoose.model('refreshtoken', RefreshTokenSchema);