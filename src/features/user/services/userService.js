const userModel = require("../models/userModel");

exports.getUserById = async (userId) => {
    return await userModel.getUserById(userId);
};

exports.getUsersBySearch = async (searchTerm) => {
    return await userModel.getUsersBySearch(searchTerm);
};

// ✅ Add this function if missing
exports.getAllUsers = async () => {
    return await userModel.getAllUsers();
};
