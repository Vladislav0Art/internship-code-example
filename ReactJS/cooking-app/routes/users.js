const express = require('express');
// route controllers
const getProfileInfo = require('../controllers/users/getProfileInfo');
const registerUser = require('../controllers/users/registerUser.js');
const authUser = require('../controllers/users/authUser.js');
const refreshTokens = require('../controllers/users/refreshTokens.js');
const updateProfileInfo = require('../controllers/users/updateProfileInfo');
const deleteUserAvatar = require('../controllers/users/deleteUserAvatar');
// middlewares
const authUserMiddleware = require('../middleware/authUserMiddleware');
// router
const router = express.Router();



// @route   GET users/profile/:id
// @descr   get profile info: name, descr
// @access  Public
router.get('/profile/:id', getProfileInfo);



// @route   POST users/register
// @descr   register new user
// @access  Public
router.post('/register', registerUser);


// @route   POST users/auth
// @descr   login user
// @access  Public
router.post('/auth', authUser);


// @route   POST users/refresh-tokens
// @descr   refresh access and refresh tokens
// @access  Public
router.post('/refresh-tokens', refreshTokens);



// @route   PUT users/update-profile/:id
// @descr   updates user info in db: password, name, email, descr
// @access  Private
router.put('/update-profile/:id', authUserMiddleware, updateProfileInfo);



// @route   DELETE users/delete-profile-avatar
// @descr   deleting user avatar from db and cloudinary service
// @access  Private
router.delete('/delete-profile-avatar', authUserMiddleware, deleteUserAvatar);


module.exports = router;