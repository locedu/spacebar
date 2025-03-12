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

// Like a post
exports.likePost = async (likeData) => {
  // Step 1: Create the like
  const like = await prisma.like.create({
    data: likeData,
  });

  // Step 2: Fetch the associated post to check its visibility
  const post = await prisma.post.findUnique({
    where: { id: like.postId },
    select: {
      userId: true,    // Get the post's author (user who created the post)
      visibility: true, // Get the post's visibility setting
    },
  });

  // Step 3: Create a notification for the author of the post (only)
  if (post.userId !== likeData.userId) {  // Ensure the like author doesn't get a notification
    const notification = {
      userId: post.userId,         // The author of the post
      targetType: NOTIFICATION_TYPES.LIKE, // Notification type: LIKE
      targetId: like.id,        // ID of the like being notified about
      createdAt: new Date(),
    };

    // Step 4: Create the notification for the post owner
    await notificationModel.createNotification(notification);  // Create notification for the post owner
  }

  return like;
};

// Unlike a post
exports.unlikePost = async (likeId) => {
  return await prisma.like.delete({
    where: { id: likeId },
  });
};

// Get likes for a specific post
exports.getLikesForPost = async (postId) => {
  return await prisma.like.findMany({
    where: { postId: postId }, // Fetch likes for the specific post
    include: {
      user: true, // Include user details (who liked the post)
    },
  });
};

// Get likes by a specific user
exports.getLikesByUser = async (userId) => {
  return await prisma.like.findMany({
    where: {
      userId: userId, // Filter likes by the given user ID
    },
    select: {
      postId: true, // Only return the postId (the post that the user liked)
      createdAt: true, // Optionally, include the timestamp for when the like was created
    },
  });
};

// Get like by user and post
exports.getLikeByUserAndPost = async (userId, postId) => {
  return await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: userId,
        postId: postId,
      },
    },
  });
};
