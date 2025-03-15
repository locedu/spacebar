const profileService = require('../services/profileService');

// ✅ Get the logged-in user's profile
exports.getOwnProfile = async (req, res) => {
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

// ✅ Update the logged-in user's profile
exports.updateOwnProfile = async (req, res) => {
    try {
        const updatedUser = await profileService.updateUserProfile(req.user.id, req.body);
        res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

// ✅ Get any user's profile (Self or Admin can fetch any profile)
exports.getProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await profileService.getProfileById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// ✅ Update any user's profile (Self can update their own profile, Admin can update others)
exports.updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Ensure self-update OR admin update
        if (req.user.id !== userId && req.user.role !== "ADMIN") {
            return res.status(403).json({ error: "Unauthorized to update this profile" });
        }

        const updatedUser = await profileService.updateUserProfile(userId, req.body);
        res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
};
