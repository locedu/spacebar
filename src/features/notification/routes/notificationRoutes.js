const express = require('express');
const notificationController = require('../controllers/notificationController'); // Import the controller
const authMiddleware = require("../../../middleware/authVerifyMiddleware"); // Import authMiddleware
const router = express.Router();

// Routes for notifications
router.post('/', authMiddleware, notificationController.createNotification); // Create a notification
router.get('/:userId', authMiddleware, notificationController.getNotifications); // Get all notifications for a user
router.put('/:notificationId', authMiddleware, notificationController.markAsRead); // Mark notification as read
router.delete('/:notificationId', authMiddleware, notificationController.deleteNotification); // Delete notification
router.get('/unread/:userId', authMiddleware, notificationController.getUnreadNotifications); // Get unread notifications for a user

module.exports = router;
