const CustomError = require('../../config/CustomError');
// models
const Post = require('../../models/Post');


const updatePost = (req, res) => {
  // user data and post id
  const user = req.user, postId = req.params.id;
  // possible data from req 
  const { title, descr, labels, directions, ingredients, dishType, video, images, thumbnail } = req.body;

  // searching for the post
  Post.findOne({ _id: postId })
    .then(post => {

      // if post not found
      if(!post) {
        throw new CustomError('Invalid data!', 'DataError');
      }

      // if author ID is not equal to user's ID
      if(String(post.authorId) !== String(user._id)) {
        throw new CustomError('Forbidden request!', 'AccessError');
      }

      // options for update request
      const options = {
        omitUndefined: true
      };

      // updating post in db
      Post.update({ _id: postId }, { title, descr, labels, directions, ingredients, dishType, video, images, thumbnail }, options)
        .then(() => {
          
          // searching for the updated post
          Post.findOne({ _id: postId })
            .then(updatedPost => {
              // send the updated post to client
              res.json(updatedPost);
            })
            .catch(err => {
              throw err;
            });

        })
        .catch(err => {
          throw err;
        });

    })
    .catch(err => res.status(400).send(new CustomError(err.message, err.name)));

};

module.exports = updatePost;