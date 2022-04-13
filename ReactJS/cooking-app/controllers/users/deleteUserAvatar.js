const CustomError = require('../../config/CustomError');
// services
const deleteAvatar = require('../deleteAvatar');
// models
const Avatar = require('../../models/Avatar');
const User = require('../../models/User');


const deleteUserAvatar = (req, res) => {
  const user = req.user;

  // updating avaltar link of user instance to empty string
  User.updateOne({ _id: user._id }, { avatarLink: '' })
    .then(() => {
      
      // searchinf for avatar instance in db
      Avatar.findOne({ ownerId: user._id })
        .then((doc) => {
          // if avatar does not exist
          if(!doc) {
            return res.status(400).send(new CustomError('Avatar does not exist!', 'ValidationError'))
          }

          // deleting avatar from cloudinary service
          deleteAvatar(doc.avatar.public_id)
            .then(() => {
              // deleting avatar from db
              Avatar.deleteOne({ ownerId: user._id })
                .then(async () => {
                  // getting updated user instance
                  const updatedUser = await User.findById(user._id);
                  res.send(updatedUser);
                })
                .catch(err => res.status(400).send(new CustomError(err.message, err.name)));
                
            })
            .catch(err => res.status(400).send(new CustomError(err.message, err.name)));

        })
        .catch(err => res.status(400).send(new CustomError(err.message, err.name)));

    })
    .catch(err => res.status(400).send(new CustomError(err.message, err.name)));
}

module.exports = deleteUserAvatar;