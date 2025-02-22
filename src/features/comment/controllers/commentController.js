const commentService = require('../services/commentService');
const authMiddleware = require('../../../middleware/authVerifyMiddleware');

// Create a new comment
exports.createComment = [authMiddleware, async (req, res) => {
    try {
        const comment = await commentService.createComment(req.body, req.user);
        res.status(201).json({ message: 'Comment created successfully', comment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}];

// Get a single comment by ID
exports.getComment = async (req, res) => {
    try {
        const comment = await commentService.getComment(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all comments for a specific post
exports.getCommentsForPost = async (req, res) => {
    try {
        const comments = await commentService.getCommentsForPost(req.params.postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all comments by a specific user
exports.getCommentsByUser = async (req, res) => {
    try {
        const comments = await commentService.getCommentsByUser(req.params.userId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all comments
exports.getAllComments = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an existing comment
exports.updateComment = [authMiddleware, async (req, res) => {
    try {
        const updatedComment = await commentService.updateComment(req.params.id, req.body, req.user);
        res.status(200).json({ message: 'Comment updated successfully', updatedComment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}];

// Delete a comment
exports.deleteComment = [authMiddleware, async (req, res) => {
    try {
        await commentService.deleteComment(req.params.id, req.user);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}];
