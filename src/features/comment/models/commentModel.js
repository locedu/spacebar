const prisma = require("../../../config/prismaClient");
const notificationModel = require("../../notification/models/notificationModel"); // Import notification model
const activityModel = require("../../activity/models/activityModel"); // Import activity model

// Constants for notification types
const NOTIFICATION_TYPES = {
  POST: 'POST',
  COMMENT: 'COMMENT',
  LIKE: 'LIKE',
  FRIEND: 'FRIEND',
  UN_FRIEND: 'UN_FRIEND',
};

// Create a new comment
exports.createComment = async (commentData) => {
  // Step 1: Create the comment
  const comment = await prisma.comment.create({
    data: commentData,
  });

  // Step 2: Fetch the associated post to check its visibility
  const post = await prisma.post.findUnique({
    where: { id: comment.postId },
    select: {
      userId: true,    // Get the post's author (user who created the post)
      visibility: true, // Get the post's visibility setting
    },
  });

  // Step 3: Create notification for the author of the post (only)
  if (post.userId !== commentData.userId) {  // Ensure the comment author doesn't get a notification
    const notification = {
      userId: post.userId,         // The author of the post
      targetType: NOTIFICATION_TYPES.COMMENT, // Notification type: COMMENT
      targetId: comment.id,        // ID of the comment being notified about
      createdAt: new Date(),
    };

    // Step 4: Create the notification for the post owner
    await notificationModel.createNotification(notification);  // Create notification for the post owner
  }

  // Step 5: Log the comment activity in Activity table
  await activityModel.createActivity({
    userId: commentData.userId, // The user who made the comment
    targetType: 'COMMENT',      // Activity type
    targetId: comment.id,       // Comment ID
    createdAt: new Date(),      // Capture the time of the comment
  });

  return comment;
};

// Get a single comment by ID
exports.getComment = async (commentId) => {
  return await prisma.comment.findUnique({
    where: { id: commentId },
  });
};

// Get all comments for a specific post
exports.getCommentsForPost = async (postId) => {
  return await prisma.comment.findMany({
    where: { postId: postId },
    include: {
      user: {
        select: {
          id: true,
          name: true,  // ✅ Include the user's name
        },
      },
    },
  });
};

// Get all comments by a specific user
exports.getCommentsByUser = async (userId) => {
  return await prisma.comment.findMany({
    where: { userId: userId },
  });
};

// Get all comments
exports.getAllComments = async () => {
  return await prisma.comment.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

// Update a comment
exports.updateComment = async (commentId, commentData) => {
  return await prisma.comment.update({
    where: { id: commentId },
    data: commentData,
  });
};

// Delete a comment
exports.deleteComment = async (commentId) => {
  return await prisma.comment.delete({
    where: { id: commentId },
  });
};
