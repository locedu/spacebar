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

    // Step 3.3: Create notifications for each friend about the new like
    const notifications = friendIds.map(friendId => ({
      userId: friendId,         // Notify the friend
      targetType: NOTIFICATION_TYPES.LIKE, // Use constant for type
      targetId: like.id,        // ID of the like being notified about
      createdAt: new Date(),    // Set creation time if needed
    }));

    // Step 3.4: Create multiple notifications at once using Prisma's `createMany`
    await notificationModel.createNotifications(notifications);  // Reuse the method to create multiple notifications
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
