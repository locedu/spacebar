const prisma = require('../../../config/prismaClient');

exports.getProfile = async (req, res) => {
    try {
        // Get the user from the decoded JWT token attached to the request object
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
