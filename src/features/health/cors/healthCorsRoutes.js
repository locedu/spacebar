const express = require('express');
const router = express.Router();
const { checkCORS } = require('./healthCorsController');  // Import the updated controller

// Health check for CORS support
router.get('/', checkCORS);  // Use the updated controller function

module.exports = router;
