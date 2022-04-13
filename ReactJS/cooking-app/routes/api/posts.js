const express = require('express');
// route controllers
const getPosts = require('../../controllers/posts/getPosts');
const getUserPosts = require('../../controllers/posts/getUserPosts');
const getProfilePosts = require('../../controllers/posts/getProfilePosts');
const getUserWishlistPosts = require('../../controllers/posts/getUserWishlistPosts');
const createPost = require('../../controllers/posts/createPost');
const updatePost = require('../../controllers/posts/updatePost');
const updateLikes = require('../../controllers/posts/updateLikes');
const updateViews = require('../../controllers/posts/updateViews');
const deletePost = require('../../controllers/posts/deletePost');
const addPostToWishlist = require('../../controllers/posts/addPostToWishlist');
const deletePostFromWishlist = require('../../controllers/posts/deletePostFromWishlist');
// middlewares
const authUserMiddleware = require('../../middleware/authUserMiddleware');
const createPaginationMiddleware = require('../../middleware/createPaginationMiddleware');
// models
const Post = require('../../models/Post');

const router = express.Router();



// @route   GET posts/get-posts?params
// @params  page=[number]&name=[string]&labels=[encoded_array]
// @descr   get posts from db. Accepts page index as query
// @access  Public
router.get('/get-posts', createPaginationMiddleware(Post), getPosts);



// @route   GET posts/get-user-posts/:id
// @descr   get posts of the user from db
// @access  Private
router.get('/get-user-posts/:id', authUserMiddleware, getUserPosts);



// @route   GET posts/get-profile-posts/:id
// @descr   get posts of other profile from db
// @access  Public
router.get('/get-profile-posts/:id', getProfilePosts);



// @route   GET posts/user-wishlist-posts
// @descr   get posts of user's wishlist from db
// @access  Private
router.get('/user-wishlist-posts', authUserMiddleware, getUserWishlistPosts);



// @route   POST posts/create-post
// @descr   create new post and save to db
// @access  Private
router.post('/create-post', authUserMiddleware, createPost);



// @route   PUT posts/update-post/:id
// @descr   update passed data of the post in db
// @access  Private
router.put('/update-post/:id', authUserMiddleware, updatePost);



// @route   PUT posts/update-views/:id
// @descr   update views property of post in db
// @access  Public
router.put('/update-views/:id', updateViews);




// @route   PUT posts/update-likes/:id
// @descr   update likes property of post in db
// @access  Public
router.put('/update-likes/:id', updateLikes);



// @route   PUT posts/add-wishlist-post/:id
// @descr   add post to user's wishlist
// @access  Private
router.put('/add-wishlist-post/:id', authUserMiddleware, addPostToWishlist);



// @route   PUT posts/delete-wishlist-post/:id
// @descr   delete post from user's wishlist
// @access  Private
router.put('/delete-wishlist-post/:id', authUserMiddleware, deletePostFromWishlist);



// @route   DELETE posts/delete-post/:id
// @descr   delete post from db
// @access  Private
router.delete('/delete-post/:id', authUserMiddleware, deletePost);


module.exports = router;