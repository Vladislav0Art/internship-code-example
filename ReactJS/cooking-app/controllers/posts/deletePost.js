const CustomError = require('../../config/CustomError');
// models
const Post = require('../../models/Post');


// deleting post from db
const deletePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;

  // searching for post in db
  Post.findOne({ _id: postId })
    .then(post => {
      // if author ID and post ID are different
      if(String(post.authorId) !== String(userId)) {
        throw new CustomError('Action forbidden!', 'AccessError');
      }

      // deleting post from db
      Post.deleteOne({ _id: postId })
        .then(() => {
          res.send('Post successfully deleted!');
        })
        .catch(err => {
          throw err;
        });
        
    })
    .catch(err => res.status(400).send(new CustomError(err.message, err.name)));  

};


module.exports = deletePost;