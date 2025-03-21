const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.checkMigration = async (req, res) => {
    try {
        // Use the 'finished_at' column to get the latest migration
        const migrations = await prisma.$queryRaw`SELECT * FROM "_prisma_migrations" ORDER BY finished_at DESC LIMIT 1`;

        if (migrations.length === 0) {
            return res.status(200).json({ status: 'No migrations found, database is clean.' });
        }

        const latestMigration = migrations[0];  // Return only the latest migration
        return res.status(200).json({
            status: 'Database migration is up-to-date.',
            latestMigration,  // Singular response with only the latest migration
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error checking migration status.' });
    }
};
