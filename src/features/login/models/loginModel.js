const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.findUserByEmail = async (email) => {
    return await prisma.user.findUnique({ where: { email } });
};
