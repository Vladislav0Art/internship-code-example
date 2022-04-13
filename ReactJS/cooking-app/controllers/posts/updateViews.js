const CustomError = require('../../config/CustomError');
// models
const Post = require('../../models/Post');


const updateViews = (req, res) => {
  const postId = req.params.id;

  // searching for post
  Post.findOne({ _id: postId })
  .then(post => {
    // views value of the document
    const views = post.views;

    // increment views value by 1
    Post.updateOne({ _id: postId }, { views: views + 1 })
      .then((response) => {
        res.json(response);
      })
      .catch(err => {
        throw err;
      })

  })
  .catch(err => res.status(400).send(new CustomError(err.message, err.name)));
};

module.exports = updateViews;