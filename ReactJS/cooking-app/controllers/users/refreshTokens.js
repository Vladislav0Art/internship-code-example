const jwt = require('jsonwebtoken');
const { secret, tokens } = require('../../config/default.json').jwt;
const CustomError = require('../../config/CustomError');
// controllers
const { createTokens } = require('../jwtService');
// models
const RefreshToken = require('../../models/RefreshToken');


const refreshTokens = (req, res) => {
  const { refreshToken } = req.body;
  let payload = null;

  try {
    payload = jwt.verify(refreshToken, secret);

    if(payload.type !== tokens.refresh.type) {
      return res.status(400).send(new CustomError('Invalid token type!', 'TokenError'));
    }
  }
  catch(err) {
    return res.status(400).send(new CustomError(err.message, err.name));
  }

  RefreshToken.findOne({ tokenId: payload.id })
    .then(token => {
      if(!token) {
        throw new CustomError('Token is invalid!', 'TokenError');
      }

      return createTokens(token.userId);
    })
    .then(tokens => {
      res.json({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      });
    })
    .catch(err => res.status(400).send(err));

};

module.exports = refreshTokens;