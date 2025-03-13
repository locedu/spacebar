const activityService = require("../services/activityService");
const authMiddleware = require("../../../middleware/authVerifyMiddleware");

exports.createActivity = [
  authMiddleware,
  async (req, res) => {
    try {
      const activity = await activityService.createActivity(req.body, req.user);
      res.status(201).json({ message: "Activity created successfully", activity });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];

exports.getActivities = [
  authMiddleware, // Protect the route with the authMiddleware
  async (req, res) => {
    const { user } = req;
    try {
      const activities = await activityService.getActivities(user.id);
      res.status(200).json(activities);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
];
