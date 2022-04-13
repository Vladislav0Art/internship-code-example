const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// controllers
const { createTokens } = require('../jwtService');
// models
const User = require('../../models/User');
// custom error
const CustomError = require('../../config/CustomError');



const authUser = (req, res) => {
  const { email, password } = req.body;

  // if email or password is not passed
  if(!email || !password) {
    return res.status(400).send(new CustomError('All fields must be filled!', 'ValidationError'));
  }

  // checking user in db
  User.findOne({ email: email })
    .then(user => {
      // if user does not exists in db
      if(!user) {
        throw new CustomError('User does not exists!', 'ValidationError');
      }

      // comparing passwords
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          // if password is wrong
          if(!isMatch) {
            return res.status(400).send(new CustomError('Invalid credentials!', 'ValidationError'));
          }

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
              throw err;
            });

        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => res.status(400).send(err));
};


module.exports = authUser;