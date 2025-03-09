const notificationModel = require("../models/notificationModel");

exports.createNotification = async (notificationData, user) => {
  // Validate required fields
  if (!notificationData.targetId || !notificationData.type) {
    throw new Error("Target ID and notification type are required");
  }

  // Add the userId to the notification data
  return await notificationModel.createNotification({ ...notificationData, userId: user.id });
};

exports.getNotifications = async (userId) => {
  return await notificationModel.getNotifications(userId);
};

exports.getNotification = async (notificationId) => {
  return await notificationModel.getNotification(notificationId);
};

exports.markAsRead = async (notificationId) => {
  const notification = await notificationModel.getNotification(notificationId);
  if (!notification) {
    throw new Error("Notification not found");
  }

  // Mark the notification as read
  return await notificationModel.markAsRead(notificationId);
};

exports.deleteNotification = async (notificationId) => {
  const notification = await notificationModel.getNotification(notificationId);
  if (!notification) {
    throw new Error("Notification not found");
  }

  // Delete the notification
  return await notificationModel.deleteNotification(notificationId);
};

exports.getUnreadNotifications = async (userId) => {
  return await notificationModel.getUnreadNotifications(userId);
};
