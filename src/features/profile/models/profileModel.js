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

exports.updateProfile = async (userId, profileData, isAdmin) => {
  try {
    // Prepare the update data
    let updateData = {
      name: profileData.name,
      statusMessage: profileData.statusMessage,
      bio: profileData.bio,
      profileImage: profileData.profileImage,
      lastLogin: profileData.lastLogin, // ✅ If passed, update lastLogin as well
    };

    // ✅ Only allow admins to update 'status', and only for other users
    if (isAdmin && profileData.status) {
      updateData.status = profileData.status;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return updatedUser;
  } catch (error) {
    throw new Error("Error updating profile");
  }
};
