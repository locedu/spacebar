const prisma = require("../../../config/prismaClient");

exports.updateProfile = async (userId, profileData) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: profileData.name,
        statusMessage: profileData.statusMessage,
        bio: profileData.bio,
        lastLogin: profileData.lastLogin, // If passed, update lastLogin as well
      },
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating profile");
  }
};
