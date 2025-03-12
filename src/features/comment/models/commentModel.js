const prisma = require("../../../config/prismaClient");
const notificationModel = require("../../notification/models/notificationModel"); // Import notification model

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

  // Step 3: If the post visibility is 'friends', create notifications for friends
  if (post.visibility === "friends") {
    // Step 3.1: Fetch friends of the post's author (excluding the author)
    const friends = await prisma.userFriends.findMany({
      where: {
        OR: [
          { userId: post.userId },  // When the authenticated user is the "userId"
          { friendId: post.userId }, // When the authenticated user is the "friendId"
        ],
      },
      select: {
        userId: true,
        friendId: true,
      },
    });

    // Step 3.2: Extract friend IDs and ensure the user is not included
    const friendIds = friends.map(f => (f.userId === post.userId ? f.friendId : f.userId))
      .filter(friendId => friendId !== post.userId); // Exclude the post creator

    // Step 3.3: Create notifications for each friend about the new comment
    const notifications = friendIds.map(friendId => ({
      userId: friendId,         // Notify the friend
      targetType: NOTIFICATION_TYPES.COMMENT, // Use constant for type
      targetId: comment.id,     // ID of the comment being notified about
      createdAt: new Date(),    // Set creation time if needed
    }));

    // Step 3.4: Create multiple notifications at once using Prisma's `createMany`
    await notificationModel.createNotifications(notifications);  // Reuse the method to create multiple notifications
  }

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
