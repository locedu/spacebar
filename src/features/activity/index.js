const activityController = require('./controllers/activityController');
const activityService = require('./services/activityService');
const activityModel = require('./models/activityModel');
const activityRoutes = require('./routes/activityRoutes');

module.exports = {
    activityController,
    activityService,
    activityModel,
    activityRoutes
};
