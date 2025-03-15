const profileService = require('../services/profileService');

// Controller method to get the profile
exports.getProfile = async (req, res) => {
    try {
        const user = await profileService.getProfileById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller method to update the profile
exports.updateProfile = async (req, res) => {
    try {
        const updatedUser = await profileService.updateUserProfile(req.user.id, req.body);
        res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
};
