const express = require('express');
const router = express.Router();
const authenticateToken = require('../../../middleware/authVerifyMiddleware');  // JWT verification middleware
const profileController = require('../controllers/profileController');
const authorizeAdmin = require('../../../middleware/adminVerifyMiddleware'); // Middleware to check admin role

// ✅ Get the logged-in user's profile
router.get('/me', authenticateToken, profileController.getOwnProfile);

// ✅ Update the logged-in user's profile
router.put('/me', authenticateToken, profileController.updateOwnProfile);

// ✅ Get any user's profile (Self or Admin can fetch any profile)
router.get('/:userId', authenticateToken, profileController.getProfile);

// ✅ Update any user's profile (Self can update their own profile, Admin can update others)
router.put('/:userId', authenticateToken, profileController.updateProfile);

module.exports = router;
