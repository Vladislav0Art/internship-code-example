const CustomError = require('../../config/CustomError');
// models
const Post = require('../../models/Post');


// creating new post and save to db
const createPost = (req, res) => {
  // user object
  const user = req.user;
  // post data
  const { title, descr, labels, directions, ingredients, dishType, video, images, thumbnail } = req.body;
  const authorId = user._id, views = 0, likes = 0;

  // if required params are missing
  if(!title || 
    !descr || 
    (!labels || !labels.length) || 
    (!directions || !directions.length) || 
    (!ingredients || !ingredients.length) || 
    !dishType || 
    !thumbnail || !authorId) {
      return res.status(400).send(new CustomError('Invalid data!', 'ValidationError'));
    }

    // creating array of words in dish type
    const dishTypeSplited = dishType.split(' ');
    dishTypeSplited.forEach((item, index) => {
      dishTypeSplited[index] = item.toLowerCase();
    });

    // creating new instance
    const newPost = new Post({
      title, descr, authorId, views, likes, labels, directions, ingredients, dishType, dishTypeSplited, video, images, thumbnail,
    });

    // saving to db
    newPost.save()
      .then(post => res.json(post))
      .catch(err => res.status(500).send(new CustomError(err.message, err.name)));
};


module.exports = createPost;