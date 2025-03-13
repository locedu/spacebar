const prisma = require("../../../config/prismaClient");

// Define the activity types enum
const ACTIVITY_TYPES = {
  POST: 'POST',
  COMMENT: 'COMMENT',
  LIKE: 'LIKE',
  FRIEND: 'FRIEND',
  UN_FRIEND: 'UN_FRIEND',
  LOGIN: 'LOGIN',  // Add LOGIN activity type
};

exports.createActivity = async (activityData) => {
  // Ensure the activityData contains a valid activity type
  if (!Object.values(ACTIVITY_TYPES).includes(activityData.targetType)) {
    throw new Error("Invalid activity type");
  }

  return await prisma.activity.create({
    data: activityData,
  });
};

exports.getActivities = async (userId) => {
  return await prisma.activity.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

