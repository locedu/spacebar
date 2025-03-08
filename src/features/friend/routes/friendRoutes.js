const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

// Routes for the current authenticated user's friends
router.get('/me', friendController.getAllFriendsForCurrentUser); // Get all friends of the current user
router.post('/me/:friendId', friendController.addFriendToCurrentUser); // Add a friend to the current user
router.get('/me/:friendId', friendController.getFriendOfCurrentUser); // Get friend of current user
router.delete('/me/:friendId', friendController.removeFriendFromCurrentUser); // Remove a friend from the current user

// Routes for getting friends of a specific user (admin access or user access)
router.get('/:userId', friendController.getAllFriendsForUser); // Get all friends of a specific user
router.get('/:userId/friend/:friendId', friendController.getFriendOfUser); // Get a specific friend of a specific user

module.exports = router;
