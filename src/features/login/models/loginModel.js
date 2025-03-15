const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            password: true,
            role: true,
            status: true, // ✅ Ensure status is included
        },
    });
};
