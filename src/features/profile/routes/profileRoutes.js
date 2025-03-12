const express = require('express');
const router = express.Router();
const authenticateToken = require('../../../middleware/authVerifyMiddleware');  // JWT verification middleware
const profileController = require('../controllers/profileController');

// Protected route to get the logged-in user's profile
router.get('/me', authenticateToken, profileController.getProfile);

// Protected route to update the logged-in user's profile
router.put('/me', authenticateToken, profileController.updateProfile);

module.exports = router;
