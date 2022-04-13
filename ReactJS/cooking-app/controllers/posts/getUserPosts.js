const CustomError = require('../../config/CustomError');
// models
const Post = require('../../models/Post');

// getting specific user's posts from db
const getUserPosts = (req, res) => {
  const userId = req.user._id.toString();
  const passedId = req.params.id;

  // if passed ID does not equal to user's ID
  if(userId !== passedId) {
    return res.status(400).send(new CustomError('Forbidden!', 'ValidationError'));
  }

  // searching for user's posts in db
  Post.find({ authorId: passedId })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(400).send(new CustomError(err.message, err.name)));
}


module.exports = getUserPosts;