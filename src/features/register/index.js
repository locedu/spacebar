const registerController = require('./controllers/registerController');
const registerService = require('./services/registerService');
const registerModel = require('./models/registerModel');
const registerRoutes = require('./routes/registerRoutes');
const validateRegister = require('./middleware/validateRegister');

module.exports = {
    registerController,
    registerService,
    registerModel,
    registerRoutes,
    validateRegister
};
