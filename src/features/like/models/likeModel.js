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
  return await prisma.like.count({
    where: { postId: postId },
  });
};

exports.getLikesByUser = async (userId) => {
  return await prisma.like.findMany({
    where: { userId: userId },
    include: { post: true },
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
