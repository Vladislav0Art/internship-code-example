const  CustomError = require('../../config/CustomError');
// models
const Post = require('../../models/Post');

const getProfilePosts = (req, res) => {
  // id of the profile
  const profileId = req.params.id;

  // searching for user's created posts
  Post.find({ authorId: profileId })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(500).send(new CustomError(err.message, err.name)));
};


module.exports = getProfilePosts;