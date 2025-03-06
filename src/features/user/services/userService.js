const userModel = require("../models/userModel");

exports.getUserById = async (userId) => {
    return await userModel.getUserById(userId);
};

// ✅ Updated to use `searchUsers`
exports.searchUsers = async (searchTerm, filter = "username") => {
    return await userModel.searchUsers(searchTerm, filter);
};

// ✅ Ensures consistency with the new model function
exports.getAllUsers = async () => {
    return await userModel.getAllUsers();
};
