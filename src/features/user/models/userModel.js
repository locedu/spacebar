const prisma = require("../../../config/prismaClient");

// Get a user by ID (Includes bio, lastLogin, lastUpdated)
exports.getUserById = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      statusMessage: true,
      bio: true, // ✅ Added bio
      lastLogin: true, // ✅ Added last login timestamp
      updatedAt: true, // ✅ Prisma automatically tracks updates
      role: true,
    },
  });
};

// Generalized user search (Supports searching by username, name, or email)
exports.searchUsers = async (query, filter = "username", limit = 10) => {
  let whereClause = {};

  if (filter === "username") {
    whereClause.username = { startsWith: query, mode: "insensitive" };
  } else if (filter === "name") {
    whereClause.name = { startsWith: query, mode: "insensitive" };
  } else if (filter === "email") {
    whereClause.email = { startsWith: query, mode: "insensitive" };
  }

  return await prisma.user.findMany({
    where: whereClause,
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
    },
    take: limit,
  });
};

// Get all users (Includes bio, lastLogin, lastUpdated)
exports.getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      bio: true, // ✅ Added bio
      lastLogin: true, // ✅ Added last login timestamp
      updatedAt: true, // ✅ Prisma tracks last update automatically
      role: true,
    },
  });
};
