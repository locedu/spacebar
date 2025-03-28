const prisma = require("../../../config/prismaClient");

// Constants for notification types
const NOTIFICATION_TYPES = {
  POST: 'POST',
  COMMENT: 'COMMENT',
  LIKE: 'LIKE',
  FRIEND: 'FRIEND',
  UN_FRIEND: 'UN_FRIEND',
};

// Create a new notification
exports.createNotification = async (notificationData) => {
  return await prisma.notification.create({
    data: notificationData,
  });
};

// Create multiple notifications at once
exports.createNotifications = async (notificationsData) => {
  return await prisma.notification.createMany({
    data: notificationsData, // Bulk insert notifications
  });
};

// Create notifications for all friends of a user when a new post is created
exports.createNotificationsForFriends = async (postId, userId) => {
  // Step 1: Get the list of friend IDs for the user
  const friends = await prisma.userFriends.findMany({
    where: {
      OR: [
        { userId: userId },  // When the authenticated user is the "userId"
        { friendId: userId }, // When the authenticated user is the "friendId"
      ],
    },
    select: {
      userId: true,
      friendId: true,
    },
  });

  // Step 2: Extract friend IDs, ensuring the user is not included
  const friendIds = friends.map(f => f.userId === userId ? f.friendId : f.userId);
  
  // Step 3: Create notifications for each friend
  const notifications = friendIds.map(friendId => ({
    userId: friendId,         // Notify the friend
    targetType: NOTIFICATION_TYPES.POST, // Use constant for type
    targetId: postId,         // ID of the post being notified about
    createdAt: new Date(),    // Set creation time if needed
  }));

  // Step 4: Create multiple notifications at once using Prisma's `createMany`
  return await prisma.notification.createMany({
    data: notifications,
  });
};

// Get all notifications for a user
exports.getNotifications = async (userId) => {
  return await prisma.notification.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',  // Sort notifications by most recent
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};

// Get a single notification by ID
exports.getNotification = async (notificationId) => {
  return await prisma.notification.findUnique({
    where: { id: notificationId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};

// Mark notification as read
exports.markAsRead = async (notificationId) => {
  return await prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  });
};

// Delete a notification by ID
exports.deleteNotification = async (notificationId) => {
  return await prisma.notification.delete({
    where: { id: notificationId },
  });
};

// Get unread notifications for a user
exports.getUnreadNotifications = async (userId) => {
  return await prisma.notification.findMany({
    where: {
      userId: userId,
      read: false,
    },
  });
};
