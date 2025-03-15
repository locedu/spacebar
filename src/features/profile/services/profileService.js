const profileModel = require('../models/profileModel');

exports.getProfileById = async (userId) => {
    return await profileModel.findUserById(userId);
};

exports.updateUserProfile = async (requestingUser, userId, profileData) => {
    const isAdmin = requestingUser.role === 'ADMIN' && requestingUser.id !== userId; // ✅ Ensure admins can't update themselves
    return await profileModel.updateProfile(userId, profileData, isAdmin);
};
