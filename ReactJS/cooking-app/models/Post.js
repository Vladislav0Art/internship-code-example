const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  descr: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  labels: {
    type: Array,
    required: true
  },
  directions: {
    type: Array,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  dishType: {
    type: String,
    required: true
  },
  video: {
    type: String,
    default: null,
    required: false
  },
  images: {
    type: Array,
    default: [],
    required: false
  },
  thumbnail: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});


module.exports = Post = mongoose.model('post', PostSchema);