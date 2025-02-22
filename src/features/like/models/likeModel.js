const prisma = require("../../../config/prismaClient");

exports.likePost = async (likeData) => {
  return await prisma.like.create({
    data: likeData,
  });
};

exports.unlikePost = async (likeId) => {
  return await prisma.like.delete({
    where: { id: likeId },
  });
};

exports.getLikesForPost = async (postId) => {
  return await prisma.like.findMany({
    where: { postId: postId }, // Fetch likes for the specific post
    include: {
      user: true, // Include user details (who liked the post)
    },
  });
};

// exports.getLikesByUser = async (userId) => {
//   return await prisma.like.findMany({
//     where: { userId: userId },
//     include: { post: true },
//   });
// };

exports.getLikesByUser = async (userId) => {
  return await prisma.like.findMany({
    where: {
      userId: userId, // Filter likes by the given user ID
    },
    select: {
      postId: true, // Only return the postId (the post that the user liked)
      createdAt: true, // Optionally, include the timestamp for when the like was created
    },
  });
};

exports.getLikeByUserAndPost = async (userId, postId) => {
  return await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: userId,
        postId: postId,
      },
    },
  });
};
