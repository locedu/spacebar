const postService = require("../services/postService");
const authMiddleware = require("../../../middleware/authVerifyMiddleware"); // Import authMiddleware

// Create a new post
exports.createPost = [
  authMiddleware,
  async (req, res) => {
    try {
      const post = await postService.createPost(req.body, req.user); // Access authenticated user from req.user
      res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

// Get a single post by ID
exports.getPost = async (req, res) => {
  try {
    const post = await postService.getPost(req.params.id); // Fetch post by ID
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    // const posts = await postService.getAllPosts();
    const posts = await postService.getAllPostsWithLikesCount();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing post
exports.updatePost = [
  authMiddleware,
  async (req, res) => {
    try {
      const updatedPost = await postService.updatePost(
        req.params.id,
        req.body,
        req.user
      );
      res
        .status(200)
        .json({ message: "Post updated successfully", updatedPost });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

// Delete a post
exports.deletePost = [
  authMiddleware,
  async (req, res) => {
    try {
      await postService.deletePost(req.params.id, req.user);
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];
