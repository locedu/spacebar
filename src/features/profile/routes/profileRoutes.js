const express = require('express');
const router = express.Router();
const authenticateToken = require('../../../middleware/authVerifyMiddleware');  // JWT verification middleware
const profileController = require('../controllers/profileController');

// Protected route to get the logged-in user's profile
router.get('/me', authenticateToken, profileController.getProfile);

module.exports = router;
