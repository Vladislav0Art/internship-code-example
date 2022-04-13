const bcrypt = require('bcryptjs');
const multiparty = require('multiparty');
// error
const CustomError = require('../../config/CustomError');
// models
const User = require('../../models/User');
const Avatar = require('../../models/Avatar');
// services
const uploadAvatar = require('../uploadAvatar');



// deleting old instance of avatar in db, creating new one and saving it in db
const createAndSaveInstanceOfAvatar = async (avatar, passedUserId) => {
  let newAvatarLink = undefined;
  // saving avatar in cloud storage
  const file = await uploadAvatar(avatar, passedUserId);

  // if file exists
  if(file) {
    // deleting old avatar from db
    await Avatar.deleteOne({ ownerId: passedUserId }, (err) => {
      // if error occured
      if(err) return res.status(400).send(new CustomError(err.message, err.name));
    });

    // creting new instance of avatar
    const newAvatar = new Avatar({
      ownerId: passedUserId,
      avatar: file
    });

    // saving new avatar
    await newAvatar.save().catch(err => res.status(400).send(new CustomError(err.message, err.name)));
    
    // getting avatar link
    if(file.eager) 
      newAvatarLink = file.eager[0].secure_url;
    else 
      newAvatarLink = file.secure_url;
  }

  return newAvatarLink;
};


// updating user and descr info in db
const updateUser = (updatingInfo) => {
  const { passedUserId, userData, options } = updatingInfo;
  return new Promise((resolve, reject) => {
    // updating user info in db with password
    User.updateOne({ _id: passedUserId }, userData, options)
      .then(() => {
        // getting updated user doc
        User.findById(passedUserId)
          .then(user => resolve(user))
          .catch(err => reject(err));
    })
      .catch(err => reject(err));
  });
};


const updateProfileInfo = (req, res) => {
  // parsing upcoming form data 
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    // if error occured
    if(err) return res.status(400).send(new CustomError(err.message, err.name))
    
    let newAvatarLink = undefined;
    const user = req.user;
    const passedUserId = req.params.id;
    // getting passed data from form
    const prevPassword = fields.prevPassword[0],
          newPassword = fields.newPassword[0],
          descr = fields.descr[0],
          name = fields.name[0],
          email = fields.email[0],
          avatar = files.avatar[0];

    // if name and email data is not passed
    if(!name || !email) {
      return res.status(400).send(new CustomError('All fields must be field!', 'ValidationError'));
    }

    // if passed id does not equal to authorized user's id
    if(String(user._id) !== passedUserId) {
      return res.status(403).send(new CustomError('Forbidden. Request denied!', 'AccessError'));
    }

    // searching for user in db
    User.findOne({ _id: passedUserId })
      .then( async (foundUser) =>  {
        // if user was not found
        if(!foundUser) {
          throw new CustomError('User not found!', 'ValidationError');
        }

        // options for User Model
        const options = {
          omitUndefined: true
        };

        // comparing passed old password with the password stored in db if both of them are not empty strings
        if(!(prevPassword === '' && newPassword === '')) {
          bcrypt.compare(prevPassword, foundUser.password)
          .then( async (isMatch) => {

            // if passed old password is incorrect
            if(!isMatch) {
              throw new CustomError('Invalid credentials!', 'ValidationError');
            }

            // generate new hashed password
            const salt = bcrypt.genSaltSync(11);
            const hash = bcrypt.hashSync(newPassword, salt);

            // getting a link for a new avatar
            newAvatarLink = await createAndSaveInstanceOfAvatar(avatar, passedUserId);

            // updating user info in db with password
            updateUser({
              passedUserId,
              userData: { email: email, password: hash, name: name, avatarLink: newAvatarLink, descr: descr },
              options
            })
              .then(response => res.send(response))
              .catch(err => res.status(400).send(new CustomError(err.message, err.name)));
              
          })
          .catch(err => res.status(400).send(new CustomError(err.message, err.name)));
        }
        // if passwords are empty strings
        else {
          
          // getting a link for a new avatar
          newAvatarLink = await createAndSaveInstanceOfAvatar(avatar, passedUserId);

          // updating user info in db
          updateUser({
            passedUserId,
            userData: { email: email, name: name, avatarLink: newAvatarLink,  descr: descr },
            options
          })
            .then(response => res.send(response))
            .catch(err => res.status(400).send(new CustomError(err.message, err.name)));

        }

      })
      .catch(err => {
        res.status(400).send(new CustomError(err.message, err.name))
      });
  });
};


module.exports = updateProfileInfo;