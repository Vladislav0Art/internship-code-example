const CustomError = require('../config/CustomError');
const config = require('../config/default.json');
const cloudinary = require('cloudinary').v2;


const deleteAvatar = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (err, result) => {
      if(err) reject(err);

      resolve(result);
    })
  });
};


module.exports = deleteAvatar;