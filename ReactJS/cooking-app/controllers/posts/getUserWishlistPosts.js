const CustomError = require('../../config/CustomError');
// models
const Post = require('../../models/Post');


// getting specific user's wishlist posts from db
const getUserWishlistPosts = (req, res) => {
  const wishlist = req.user.wishlist;

  // contains all IDs from user's wishlist
  const query = [];
  // putting all IDs in query array
  wishlist.forEach(element => {
    query.push({ _id: element });
  });

  // searching for wishlist posts in db
  Post.find({ $or: query })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(400).send(new CustomError(err.message, err.name)));  
};


module.exports = getUserWishlistPosts;