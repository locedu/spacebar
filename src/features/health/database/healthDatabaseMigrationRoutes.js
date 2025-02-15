const express = require('express');
const router = express.Router();
const { checkMigration } = require('./healthDatabaseMigrationController');  // Updated controller function

// Health check for the latest database migration
router.get('/', checkMigration);  // Updated to match the singular logic

module.exports = router;
