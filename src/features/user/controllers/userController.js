const userService = require("../services/userService");
const authMiddleware = require("../../../middleware/authVerifyMiddleware"); // Import authentication middleware

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(400).json({ error: error.message });
  }
};

// Search users by name or username (Live Search)
exports.getUsersBySearch = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json({ error: "Search term is required" });
    }

    const users = await userService.getUsersBySearch(searchTerm);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all users (Admin only)
exports.getAllUsers = [
  authMiddleware,
  async (req, res) => {
    try {
      if (req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "Unauthorized" });
      }
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];
