const prisma = require('../../../config/prismaClient');

// Controller method to get the profile
exports.getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
        });

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
        const { name, statusMessage, bio } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: { name, statusMessage, bio },
        });

        res.status(200).json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
};
