const activityModel = require("../models/activityModel");

exports.createActivity = async (activityData, user) => {
  if (!activityData.targetId || !activityData.targetType) {
    throw new Error("Target ID and Type are required");
  }

  return await activityModel.createActivity({ ...activityData, userId: user.id });
};

exports.getActivities = async (userId) => {
  return await activityModel.getActivities(userId);
};
