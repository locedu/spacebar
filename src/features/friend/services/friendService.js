const modelFriend = require("../models/friendModel"); // Corrected import path

// Get all friends for the current authenticated user
exports.getAllFriendsForCurrentUser = async (userId) => {
  return await modelFriend.getAllFriends(userId);
};

// Add a friend for the current authenticated user
exports.addFriendToCurrentUser = async (userId, friendId) => {
  try {
    return await modelFriend.addFriend(userId, friendId);
  } catch (error) {
    if (error.message === 'Friendship already exists') {
      throw new Error('Friendship already exists');
    }
    throw error;
  }
};

// Remove a friend for the current authenticated user
exports.removeFriendFromCurrentUser = async (userId, friendId) => {
  try {
    // Call the model to remove the friend
    const result = await modelFriend.removeFriend(userId, friendId);
    if (!result) {
      // If no result (friendship doesn't exist), throw a meaningful error
      throw new Error('User not on friends list');
    }
    return result; // Proceed with the removal if the friendship exists
  } catch (error) {
    // Propagate the error so it can be handled in the controller
    throw error;
  }
};

// Get all friends for a specific user (admin access or user access)
exports.getAllFriendsForUser = async (userId) => {
  return await modelFriend.getAllFriends(userId);
};

// Get a specific friend for the current authenticated user
exports.getFriendForCurrentUser = async (userId, friendId) => {
  return await modelFriend.getFriend(userId, friendId);
};

// Get a specific friend for a specific user (admin access or user access)
exports.getFriendOfUser = async (userId, friendId) => {
  return await modelFriend.getFriend(userId, friendId);
};

// New function to get a specific friend for the current user
exports.getFriendOfCurrentUser = async (userId, friendId) => {
  return await modelFriend.getFriend(userId, friendId);
};
