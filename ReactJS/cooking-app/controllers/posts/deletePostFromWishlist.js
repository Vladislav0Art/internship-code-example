const CustomError = require('../../config/CustomError');
// models
const User = require('../../models/User');


const deletePostFromWishlist = (req, res) => {
  const user = req.user;
  const postId = req.params.id;

  // tracks if post ID removed from wishlist
  let postRemoved = false;
  // filtering post IDs in wishlist
  const newUserWishlist = user.wishlist.filter((item) => {
    // if item equals to post ID, then set variable to true
    if(item === postId) postRemoved = true; 
    return (item !== postId);
  });

  // if post was removed from wishlist
  if(postRemoved) {
    // updating user in db
    User.updateOne({ _id: user._id }, { wishlist: newUserWishlist })
      .then(response => {
        res.send('Post has been removed from db!');
      })
      .catch(err => res.status(400).send(new CustomError(err.message, err.name)));
  }
  else {
    // if post ID did not exist in user's wishlist
    res.status(400).send(new CustomError('Invalid request!', 'ValidationError'));
  }

};

module.exports = deletePostFromWishlist;