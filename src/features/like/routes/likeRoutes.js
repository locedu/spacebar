const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

// Define routes
router.post('/:postId', likeController.likePost);  // Like a post
router.delete('/:postId', likeController.unlikePost);  // Unlike a post
router.get('/post/:postId', likeController.getLikesForPost);  // Get total likes for a post
router.get('/user/:userId', likeController.getLikesByUser);  // Get all posts liked by a user

module.exports = router;
