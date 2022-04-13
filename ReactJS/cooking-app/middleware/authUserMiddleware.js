const jwt = require('jsonwebtoken');
const { secret, tokens } = require('../config/default.json').jwt;
const CustomError = require('../config/CustomError');
// models
const User = require('../models/User'); 


const authUserMiddleware = (req, res, next) => {
  // getting access token from header
  const token = req.get('access-token');

  // if token is not provided
  if(!token) {
    return res.status(401).send(new CustomError('Token is not provided!', 'TokenError'));
  }

  try {
    // verifying token
    const payload = jwt.verify(token, secret);

    // if token type is not 'access'
    if(payload.type !== tokens.access.type) {
      return res.status(401).send(new CustomError('Token is not valid!', 'TokenError'));
    }

    // searching for user
    User.findOne({ _id: payload.userId })
      .select('-password')
      .then(user => {
        // if user does not exist
        if(!user) {
          throw new CustomError('Token is invalid!', 'TokenError');
        }

        // setting user as request property
        req.user = user;
        next();
      })
      .catch(err => res.status(401).send(err));

  }
  catch(err) {
    return res.status(401).send(new CustomError(err.message, err.name));
  }

};


module.exports = authUserMiddleware;