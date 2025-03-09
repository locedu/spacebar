const notificationController = require('./controllers/notificationController');
const notificationService = require('./services/notificationService');
const notificationModel = require('./models/notificationModel');
const notificationRoutes = require('./routes/notificationRoutes');

module.exports = {
    notificationController,
    notificationService,
    notificationModel,
    notificationRoutes
};
