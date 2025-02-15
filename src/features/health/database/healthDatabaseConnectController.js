const prisma = require('../../../config/prismaClient');

exports.checkDatabase = async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;  // Simple query to check DB connection
        res.status(200).json({ status: 'Database connected' });
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed' });
    }
};
