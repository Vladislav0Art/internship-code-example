const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// services
const { createTokens } = require('../jwtService');
// models
const User = require('../../models/User');
// custom error
const CustomError = require('../../config/CustomError');


const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  // validating the data
  if(!name || !email || !password) {
    res.status(400).send(new CustomError('All fields must be filled!', 'ValidationError'));
    return;
  }

  // checking if user exists
  User.findOne({ email: email })
    .then(user => {
      if(user) {
        res.status(400).send(new CustomError('User already exists!', 'ValidationError'));
        return;
      }

      // creating new user
      const newUser = new User({
        email, name, password
      });

      // generating bcrypt salt
      bcrypt.genSalt(11, (err, salt) => {
        if(err) throw err;

        // generating bcrypt hash
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;

          // updating user's password
          newUser.password = hash;

          // saving user to db
          newUser.save()
            .then(user => {

              // creating access and refresh tokens
              createTokens(user._id)
              .then(tokens => {
                res.send({
                  accessToken: tokens.accessToken,
                  refreshToken: tokens.refreshToken,
                  user: {
                    name: user.name,
                    email: user.email
                  }
                });
              })
              .catch(err => {
                res.status(400).send(new CustomError(err.message, err.name));
              });

            })
            .catch(err => {
              res.status(400).send(new CustomError(err.message, err.name));
            });

        });

      });

    })
    .catch(err => res.status(400).send(new CustomError(err.message, err.name)));

};


module.exports = registerUser;