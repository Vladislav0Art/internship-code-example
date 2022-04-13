const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvatarSchema = new Schema({
  ownerId: {
    type: String,
    required: true
  },
  avatar: {
    asset_id: {
      type: String,
      default: ''
    },
    public_id: {
      type: String,
      default: ''
    },
    version: {
      type: Number,
      default: -1
    },
    version_id: {
      type: String
    },
    signature: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    format: {
      type: String,
      default: ''
    },
    resource_type: {
      type: String, 
      default: ''
    },
    created_at: {
      type: Date
    },
    tags: {
      type: Array,
      default: []
    },
    bytes: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    },
    etag: {
      type: String,
      default: ''
    },
    placeholder: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    secure_url: {
      type: String,
      default: ''
    },
    original_filename: {
      type: String,
      default: ''
    },
    eager: {
      type: Array,
      default: []
    }
  }
});


module.exports = Avatar = mongoose.model('avatar', AvatarSchema);