const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../../../middleware/authVerifyMiddleware"); // Import authentication middleware

// ✅ Live Search: Find users by username, name, or email
router.get("/search", userController.searchUsers);

// ✅ Get user by ID
router.get("/:userId", userController.getUserById);

// ✅ Get all users (Admin only)
router.get("/", authMiddleware, userController.getAllUsers);

module.exports = router;
