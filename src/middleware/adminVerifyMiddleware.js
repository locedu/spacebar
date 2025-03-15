const prisma = require("../config/prismaClient");

module.exports = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { role: true },
        });

        if (!user || user.role !== "ADMIN") {
            return res.status(403).json({ error: "Access denied. Admins only." });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: "Authorization check failed." });
    }
};
