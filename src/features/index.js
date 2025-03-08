const registerRoutes = require("./register/routes/registerRoutes");
const loginRoutes = require("./login/routes/loginRoutes");
const profileRoutes = require("./profile/routes/profileRoutes");
const postRoutes = require("./post/routes/postRoutes");
const commentRoutes = require("./comment/routes/commentRoutes");
const likeRoutes = require("./like/routes/likeRoutes");
const userRoutes = require("./user/routes/userRoutes"); // ✅ Added User Routes
const friendRoutes = require("./friend/routes/friendRoutes"); // ✅ Added Friend Routes

module.exports = { 
    registerRoutes, 
    loginRoutes, 
    profileRoutes, 
    postRoutes, 
    commentRoutes, 
    likeRoutes, 
    userRoutes, // ✅ Exporting User Routes
    friendRoutes, // ✅ Exporting Friend Routes
};
