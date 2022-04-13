const CustomError = require('../../config/CustomError');
// models
const Post = require('../../models/Post');


const updateLikes = (req, res) => {
  const postId = req.params.id;
  const likesState = req.body.likesState;

  // searching for post
  Post.findOne({ _id: postId })
    .then(post => {
      // likes value of the document
      const likes = post.likes;

      // increment likes value depending on the likes state (0 -> "-1"; 1 -> "+1")
      if(likesState == 1) {
        Post.updateOne({ _id: postId }, { likes: likes + 1 })
        .then((response) => {
          res.json(response);
        })
        .catch(err => {
          throw err;
        })
      }
      else {
        Post.updateOne({ _id: postId }, { likes: likes - 1 })
        .then((response) => {
          res.json(response);
        })
        .catch(err => {
          throw err;
        })
      }


    })
    .catch(err => res.status(400).send(new CustomError(err.message, err.name)));
};


module.exports = updateLikes;