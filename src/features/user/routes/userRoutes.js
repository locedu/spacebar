const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../../../middleware/authVerifyMiddleware"); // Import authentication middleware

// Get user by ID
router.get("/:userId", userController.getUserById);

// Live Search: Find users by name or username (supports query string)
router.get("/search", userController.getUsersBySearch);

// Get all users (Admin only)
router.get("/", authMiddleware, userController.getAllUsers);

module.exports = router;
