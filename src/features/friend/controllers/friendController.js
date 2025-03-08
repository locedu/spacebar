const {
  getAllFriendsForCurrentUser,
  addFriendToCurrentUser,
  removeFriendFromCurrentUser,
  getFriendOfCurrentUser,
  getAllFriendsForUser,
  getFriendOfUser
} = require('../services/friendService');

const authMiddleware = require('../../../middleware/authVerifyMiddleware');

// Get all friends for the current authenticated user
exports.getAllFriendsForCurrentUser = [authMiddleware, async (req, res) => {
  try {
    const friends = await getAllFriendsForCurrentUser(req.user.id); // Assumes user ID is available in req.user
    res.status(200).json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get friends" });
  }
}];

// Add a friend for the current authenticated user
exports.addFriendToCurrentUser = [authMiddleware, async (req, res) => {
  const { friendId } = req.params;
  try {
    const friend = await addFriendToCurrentUser(req.user.id, friendId);
    res.status(201).json(friend);
  } catch (error) {
    if (error.message === 'Friendship already exists') {
      return res.status(400).json({ error: 'You are already friends with this user.' });
    }
    console.error(error);
    res.status(500).json({ error: "Failed to add friend" });
  }
}];

// Remove a friend for the current authenticated user
exports.removeFriendFromCurrentUser = [authMiddleware, async (req, res) => {
  const { friendId } = req.params;
  try {
    await removeFriendFromCurrentUser(req.user.id, friendId);
    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove friend" });
  }
}];

// Get a specific friend for the current authenticated user
exports.getFriendOfCurrentUser = [authMiddleware, async (req, res) => {
  const { friendId } = req.params;
  try {
    const friend = await getFriendOfCurrentUser(req.user.id, friendId);
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }
    res.status(200).json(friend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get friend" });
  }
}];

// Get all friends for a specific user (admin access)
exports.getAllFriendsForUser = [authMiddleware, async (req, res) => {
  const { userId } = req.params;
  try {
    const friends = await getAllFriendsForUser(userId);
    res.status(200).json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get friends" });
  }
}];

// Get a specific friend of a specific user (admin access)
exports.getFriendOfUser = [authMiddleware, async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const friend = await getFriendOfUser(userId, friendId); // Ensure we query the specific friend from the right user
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }
    res.status(200).json(friend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get friend" });
  }
}];
