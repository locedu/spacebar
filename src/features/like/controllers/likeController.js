const likeService = require("../services/likeService");
const authMiddleware = require("../../../middleware/authVerifyMiddleware");

// Like a post
exports.likePost = [
  authMiddleware,
  async (req, res) => {
    try {
      const like = await likeService.likePost(req.params.postId, req.user);
      res.status(201).json({ message: "Post liked successfully", like });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

// Unlike a post
exports.unlikePost = [
  authMiddleware,
  async (req, res) => {
    try {
      await likeService.unlikePost(req.params.postId, req.user);
      res.status(200).json({ message: "Post unliked successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

// Get total likes for a post
// exports.getLikesForPost = async (req, res) => {
//     try {
//         const likes = await likeService.getLikesForPost(req.params.postId);
//         res.status(200).json({ likes });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };
exports.getLikesForPost = async (req, res) => {
  try {
    const likes = await likeService.getLikesForPost(req.params.postId);
    if (!likes || likes.length === 0) {
      return res.status(404).json({ error: "No likes found for this post" });
    }
    res.status(200).json(likes); // Return likes with user details
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all posts liked by a specific user
exports.getLikesByUser = async (req, res) => {
  try {
    const likes = await likeService.getLikesByUser(req.params.userId);
    if (!likes || likes.length === 0) {
      return res.status(404).json({ error: "No likes found for this user" });
    }
    res.status(200).json(likes); // Return the list of likes with postId and timestamp
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
