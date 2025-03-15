const profileModel = require('../models/profileModel');

exports.getProfileById = async (userId) => {
    return await profileModel.findUserById(userId);
};

exports.updateUserProfile = async (userId, profileData) => {
    return await profileModel.updateProfile(userId, profileData);
};
