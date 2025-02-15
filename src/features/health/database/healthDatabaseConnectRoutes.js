const express = require('express');
const router = express.Router();
const { checkDatabase } = require('./healthDatabaseConnectController');  // Import controller

// Health check for database connectivity
router.get('/', checkDatabase);

module.exports = router;
