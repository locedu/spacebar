const registerRoutes = require("./register/routes/registerRoutes");
const loginRoutes = require("./login/routes/loginRoutes");
const profileRoutes = require("./profile/routes/profileRoutes");
const postRoutes = require("./post/routes/postRoutes");
const commentRoutes = require("./comment/routes/commentRoutes");
const likeRoutes = require("./like/routes/likeRoutes");
const userRoutes = require("./user/routes/userRoutes");
const friendRoutes = require("./friend/routes/friendRoutes"); 
const notificationRoutes = require("./notification/routes/notificationRoutes"); // ✅ Added Notification Routes

module.exports = { 
    registerRoutes, 
    loginRoutes, 
    profileRoutes, 
    postRoutes, 
    commentRoutes, 
    likeRoutes, 
    userRoutes, 
    friendRoutes, 
    notificationRoutes // ✅ Exporting Notification Routes
};
