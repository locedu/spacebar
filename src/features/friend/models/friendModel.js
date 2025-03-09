const prisma = require("../../../config/prismaClient");

// Function to get all friends of a user (current user or any other user)
const getAllFriends = async (userId) => {
  // Step 1: Retrieve all friendships where the user is the "userId"
  const friendsAsUser = await prisma.userFriends.findMany({
    where: { userId: userId },
    select: { friendId: true },
  });

  // Step 2: Retrieve all friendships where the user is the "friendId"
  const friendsAsFriend = await prisma.userFriends.findMany({
    where: { friendId: userId },
    select: { userId: true },
  });

  // Combine both lists of friend ids, removing duplicates
  const friendIds = [
    ...friendsAsUser.map((friend) => friend.friendId),
    ...friendsAsFriend.map((friend) => friend.userId),
  ];

  // Filter duplicates by converting to a Set, then back to an array
  const uniqueFriendIds = [...new Set(friendIds)];

  // Step 3: Retrieve friend details based on the unique friend ids
  const friendDetails = await prisma.user.findMany({
    where: { id: { in: uniqueFriendIds } },
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
  });

  // Return the complete details of the friends
  return friendDetails;
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
    throw new Error("One or both users do not exist");
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
    throw new Error("Friendship already exists");
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
    throw new Error("Friendship does not exist");
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
      friend: {
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
