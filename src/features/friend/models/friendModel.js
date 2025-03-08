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
      friend: {   // Only include the friend's details
        select: {
          id: true,
          username: true,
          name: true,
          status: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          lastLogin: true,
        },
      },
    },
  }).then((result) => result.map((friendship) => friendship.friend)); // Flatten the result to return just the friend's data
};

// Function to add a friend for the current user
const addFriend = async (userId, friendId) => {
  // Check if the current user exists
  const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });

  // Check if the friend exists
  const friendExists = await prisma.user.findUnique({
    where: { id: friendId },
  });

  // If either user doesn't exist, throw an error
  if (!userExists || !friendExists) {
    throw new Error('One or both users do not exist');
  }

  // Check if the friendship already exists
  const existingFriendship = await prisma.userFriends.findFirst({
    where: {
      OR: [
        { userId: userId, friendId: friendId },
        { userId: friendId, friendId: userId },
      ],
    },
  });

  if (existingFriendship) {
    throw new Error('Friendship already exists');
  }

  // Create the friendship
  return await prisma.userFriends.create({
    data: {
      userId: userId,
      friendId: friendId,
    },
  });
};

// Function to remove a friend for the current user
const removeFriend = async (userId, friendId) => {
  // Check if the friendship exists
  const friendship = await prisma.userFriends.findFirst({
    where: {
      OR: [
        { userId: userId, friendId: friendId },
        { userId: friendId, friendId: userId },
      ],
    },
  });

  if (!friendship) {
    // If no friendship is found, throw an error with a meaningful message
    throw new Error('Friendship does not exist');
  }

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
  const friendship = await prisma.userFriends.findFirst({
    where: {
      OR: [
        { userId: userId, friendId: friendId },
        { userId: friendId, friendId: userId },
      ],
    },
    include: {
      friend: {   // Only include the friend's details
        select: {
          id: true,
          username: true,
          name: true,
          status: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          lastLogin: true,
        },
      },
    },
  });

  if (friendship) {
    // Return the correct friend details based on userId vs friendId
    return friendship.userId === userId ? friendship.friend : friendship.user;
  } else {
    return null;
  }
};

// Export functions for use in the service layer
module.exports = {
  getAllFriends,
  addFriend,
  removeFriend,
  getFriend,
};
