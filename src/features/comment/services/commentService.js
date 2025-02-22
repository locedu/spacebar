const commentModel = require('../models/commentModel');

exports.createComment = async (commentData, user) => {
    if (!commentData.content) {
        throw new Error('Content is required');
    }

    // Create the new comment via model
    return await commentModel.createComment({ ...commentData, userId: user.id });
};

exports.getComment = async (commentId) => {
    return await commentModel.getComment(commentId);
};

exports.getCommentsForPost = async (postId) => {
    return await commentModel.getCommentsForPost(postId);
};

exports.getCommentsByUser = async (userId) => {
    return await commentModel.getCommentsByUser(userId);
};

exports.getAllComments = async () => {
    return await commentModel.getAllComments();
};

exports.updateComment = async (commentId, commentData, user) => {
    const existingComment = await commentModel.getComment(commentId);
    if (!existingComment) {
        throw new Error('Comment not found');
    }
    if (existingComment.userId !== user.id) {
        throw new Error('Unauthorized to update this comment');
    }

    return await commentModel.updateComment(commentId, commentData);
};

exports.deleteComment = async (commentId, user) => {
    const comment = await commentModel.getComment(commentId);
    if (!comment) {
        throw new Error('Comment not found');
    }
    if (comment.userId !== user.id) {
        throw new Error('Unauthorized to delete this comment');
    }

    return await commentModel.deleteComment(commentId);
};
