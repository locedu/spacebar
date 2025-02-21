const express = require("express");
const postController = require("../controllers/postController");
const authenticateToken = require('../../../middleware/authVerifyMiddleware'); 

const router = express.Router();

// Routes for Post
router.post("/", authenticateToken, postController.createPost); // Create Post
router.get("/", authenticateToken, postController.getAllPosts); // Get all posts
router.get("/:id", authenticateToken, postController.getPost); // Get post by ID
router.put("/:id", authenticateToken, postController.updatePost); // Update post by ID
router.delete("/:id", authenticateToken, postController.deletePost); // Delete post by ID

module.exports = router;
