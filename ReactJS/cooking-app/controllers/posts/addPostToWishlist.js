const CustomError = require('../../config/CustomError');
// models
const Post = require('../../models/Post');
const User = require('../../models/User');


const addPostToWishlist = (req, res) => {
  const user = req.user;
  const postId = req.params.id;

  // checking if post has been added
  const foundElement = user.wishlist.find((item) => {
    return item === postId;
  });

  // if post added send error
  if(foundElement !== undefined) {
    return res.status(400).send(new CustomError('Post has been already added!', 'ValidationError'));
  }

  // searching for post in db
  Post.findOne({ _id: postId })
    .then(post => {
      // if user is author of post, throw error
      if(post.authorId.toString() === user._id.toString()) {
        throw new CustomError('Post belongs to the user', 'ValidationError');
      }

      // otherwise push post ID to user withlist
      user.wishlist.push(postId);

      // updating user document in db
      User.updateOne({ _id: user._id }, { wishlist: user.wishlist })
      .then(response => {
        res.send('New post has been added to user\'s wishlist!');
      })
      .catch(err => {
        throw err;
      });

    })
    .catch(err => res.status(400).send(new CustomError(err.message, err.name)));

};


module.exports = addPostToWishlist;
