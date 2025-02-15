const healthDatabaseConnectRoutes = require('./database/healthDatabaseConnectRoutes');
const healthDatabaseMigrationRoutes = require('./database/healthDatabaseMigrationRoutes');
const healthCorsRoutes = require('./cors/healthCorsRoutes');

module.exports = {
    healthDatabaseConnectRoutes,
    healthDatabaseMigrationRoutes,
    healthCorsRoutes
};
