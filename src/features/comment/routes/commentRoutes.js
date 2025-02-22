const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Define routes
router.post('/', commentController.createComment);
router.get('/:id', commentController.getComment);
router.get('/post/:postId', commentController.getCommentsForPost);
router.get('/user/:userId', commentController.getCommentsByUser);  // New route
router.get('/', commentController.getAllComments);  // New route
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
