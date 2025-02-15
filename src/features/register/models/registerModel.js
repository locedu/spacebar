const prisma = require('../../../config/prismaClient');

exports.createUser = async (userData) => {
    return await prisma.user.create({ data: userData });
};
