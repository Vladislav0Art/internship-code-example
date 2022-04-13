const CustomError = require('../../config/CustomError');
// models
const User = require('../../models/User');


// getting profile information by passed id param 
const getProfileInfo = (req, res) => {
  const profileId = req.params.id;

  User.findOne({ _id: profileId })
    .select('-password') // exclude password from user instance
    .then(user => {
      if(!user) {
        throw new CustomError('No user information found!', 'ValidationError');
      }
      // sending user object
      res.json({
        user: user
      });
    })
    .catch(err => res.status(500).send(new CustomError(err.message, err.name)));
};


module.exports = getProfileInfo;