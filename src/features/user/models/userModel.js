const prisma = require("../../../config/prismaClient");

// Get a user by ID
exports.getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      name: true,
      statusMessage: true,
      role: true, // ✅ Include role for admin checks
    },
  });
};

// Search users by username (Live Search)
exports.searchUsersByUsername = async (query, limit = 10) => {
  return await prisma.user.findMany({
    where: {
      username: {
        startsWith: query, // Matches any username that starts with 'query'
        mode: "insensitive", // Case-insensitive search
      },
    },
    select: {
      id: true,
      username: true,
      name: true,
    },
    take: limit, // Limit number of results
  });
};

// ✅ Add this function to fix the error
exports.getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      role: true, // ✅ Required for checking admin users
    },
  });
};
