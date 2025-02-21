const postController = require('./controllers/postController');
const postService = require('./services/postService');
const postModel = require('./models/postModel');
const postRoutes = require('./routes/postRoutes');
const validateRegister = require('./middleware/validateRegister');

module.exports = {
    postController,
    postService,
    postModel,
    postRoutes,
    validateRegister
};
