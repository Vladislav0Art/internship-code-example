const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { secret, tokens } = require('../config/default.json').jwt;
// models
const RefreshToken = require('../models/RefreshToken');



const generateAccessToken = (userId) => {
  // creating payload for token
  const payload = {
    userId: userId,
    type: tokens.access.type
  };

  // additional options
  const options = {
    expiresIn: tokens.access.expiresIn
  };

  // erturn access token
  return jwt.sign(payload, secret, options);
};


const generateRefreshToken = () => {
  // creating payload for token
  const payload = {
    id: uuidv4(),
    type: tokens.refresh.type
  };

  // additional options
  const options = {
    expiresIn: tokens.refresh.expiresIn
  };

  // return token and id
  return {
    id: payload.id,
    token: jwt.sign(payload, secret, options)
  };
}

const saveRefreshTokenToDB = (userId, refreshTokenId) => {
  // returning new promise
  return (new Promise((resolve, reject) => {

    // find user's tokens
    RefreshToken.find({ userId: userId })
      .then(tokens => {

        // if tokens length bigger than 3 then delete all tokens
        if(tokens.length > 3) {
          // deleting tokens
          RefreshToken.deleteMany({ userId: userId })
            .then(res => {

              // creating new token
              RefreshToken.create({ userId: userId, tokenId: refreshTokenId })
                .then(token => {
                  resolve(token);
                })
                .catch(err => {
                  throw err;
                });

            })
            .catch(err => {
              throw err;
            });
        }
        else {

          // creating new token
          RefreshToken.create({ userId: userId, tokenId: refreshTokenId })
            .then(token => {
              resolve(token);
            })
            .catch(err => {
              throw err;
            });

        }
      })
      .catch(err => {
        reject(err);
      });

  }));
}

const createTokens = (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken();

  return saveRefreshTokenToDB(userId, refreshToken.id)
    .then(() => ({
      accessToken: accessToken,
      refreshToken: refreshToken.token
    }));
}


module.exports = {
  createTokens
};