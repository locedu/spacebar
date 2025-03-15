const prisma = require("../../../config/prismaClient");

exports.findUserById = async (userId) => {
  try {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  } catch (error) {
    throw new Error("Error fetching user profile");
  }
};

exports.updateProfile = async (userId, profileData) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: profileData.name,
        statusMessage: profileData.statusMessage,
        bio: profileData.bio,
        profileImage: profileData.profileImage, // ✅ Include profile image
        lastLogin: profileData.lastLogin, // ✅ If passed, update lastLogin as well
        status: profileData.status, // ✅ Allow updating user status
      },
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating profile");
  }
};
