const prisma = require("../../../config/prismaClient");

// Function to get all friends of a user (current user or any other user)
const getAllFriends = async (userId) => {
  return await prisma.userFriends.findMany({
    where: {
      OR: [
        { userId: userId },  // Friends where the user is the first one
        { friendId: userId }, // Friends where the user is the second one (the friend)
      ],
    },
    include: {
      user: true,   // Include the user data for the first user in the relationship
      friend: true, // Include the user data for the second user (the friend)
    },
  });
};

// Function to add a friend for the current user
const addFriend = async (userId, friendId) => {
  // Check if the friendship already exists
  const existingFriendship = await prisma.userFriends.findFirst({
    where: {
      OR: [
        { userId: userId, friendId: friendId },
        { userId: friendId, friendId: userId }
      ]
    }
  });

  // If friendship already exists, return a message instead of adding
  if (existingFriendship) {
    throw new Error('Friendship already exists');
  }

  // If no friendship exists, create a new one
  return await prisma.userFriends.create({
    data: {
      userId: userId,
      friendId: friendId,
    },
  });
};

// Function to remove a friend for the current user
const removeFriend = async (userId, friendId) => {
  return await prisma.userFriends.deleteMany({
    where: {
      OR: [
        { userId: userId, friendId: friendId },
        { userId: friendId, friendId: userId },
      ],
    },
  });
};

// Function to get a specific friend (from either side of the relationship)
const getFriend = async (userId, friendId) => {
  return await prisma.userFriends.findFirst({
    where: {
      OR: [
        { userId: userId, friendId: friendId },
        { userId: friendId, friendId: userId },
      ],
    },
    include: {
      user: true,
      friend: true,
    },
  });
};

// Export functions for use in the service layer
module.exports = {
  getAllFriends,
  addFriend,
  removeFriend,
  getFriend,
};
