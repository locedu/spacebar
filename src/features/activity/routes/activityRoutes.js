const express = require('express');
const activityController = require('../controllers/activityController');
const authMiddleware = require("../../../middleware/authVerifyMiddleware");

const router = express.Router();

// Routes for activities
router.post('/', authMiddleware, activityController.createActivity); // Create an activity
router.get('/', authMiddleware, activityController.getActivities); // Get all activities for a user

module.exports = router;
