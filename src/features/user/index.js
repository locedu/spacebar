const userController = require("./controllers/userController");
const userService = require("./services/userService");
const userModel = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");

module.exports = {
    userController,
    userService,
    userModel,
    userRoutes,
};
