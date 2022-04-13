const path = require('path');
const cloudinary = require('cloudinary').v2;
const config = require('../config/default.json');


const uploadAvatar = (file, userId) => {
  return new Promise((resolve, reject) => {
    const regexp = /^image\/(jpeg|png|gif|jpg)/;
    const emptyFileRegexp = /application\/octet-stream/;

    // if file does not have format: file was not provided
    if(file.headers['content-type'].match(emptyFileRegexp)) {
      resolve(null);
    }

    // parsing content-type of a file
    if(!file.headers['content-type'].match(regexp)) {
      reject(new CustomError('Images are valid only!', 'ValidationError'));
    }

    // options for storing image
    const options = {
      // sets the filename without extention
      public_id: `${userId}-avatar`,
      folder: `${config.cloudinaryConfig.app_folder}/avatars/${userId}/`,
      overwrite: true,
      // sets cloudinary image cropping system
      eager: config.cloudinaryConfig.avatars_eager
    };

    // uploading image to cloud storage
    cloudinary.uploader.upload(file.path, options, (err, result) => {
      // if error occured
      if(err) {
        reject(new CustomError(err.message, err.name));
      }
      // when file is saved successfully
      resolve(result);
    });
  });
};


module.exports = uploadAvatar;