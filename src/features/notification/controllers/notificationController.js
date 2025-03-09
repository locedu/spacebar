const notificationService = require("../services/notificationService");
const authMiddleware = require("../../../middleware/authVerifyMiddleware"); // Import authMiddleware

// Create a new notification
exports.createNotification = [
  authMiddleware,
  async (req, res) => {
    try {
      const notification = await notificationService.createNotification(req.body, req.user); // Access authenticated user from req.user
      res.status(201).json({ message: "Notification created successfully", notification });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

// Get a single notification by ID
exports.getNotification = async (req, res) => {
  try {
    const notification = await notificationService.getNotification(req.params.id); // Fetch notification by ID
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all notifications for a user
exports.getNotifications = async (req, res) => {
  const { user } = req; // Get the authenticated user's ID from the JWT
  try {
    const notifications = await notificationService.getNotifications(user.id);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  const notificationId = req.params.notificationId;  // Access notificationId from the URL
  if (!notificationId) {
    return res.status(400).json({ error: "Notification ID is required" });
  }

  try {
    const updatedNotification = await notificationService.markAsRead(notificationId);
    res.status(200).json({ message: "Notification marked as read", updatedNotification });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    await notificationService.deleteNotification(req.params.id);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get unread notifications for a user
exports.getUnreadNotifications = async (req, res) => {
  const { user } = req; // Get the authenticated user's ID from the JWT
  try {
    const unreadNotifications = await notificationService.getUnreadNotifications(user.id);
    res.status(200).json(unreadNotifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
