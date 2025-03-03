const prisma = require("../../../config/prismaClient");

exports.createComment = async (commentData) => {
  return await prisma.comment.create({
    data: commentData,
  });
};

exports.getComment = async (commentId) => {
  return await prisma.comment.findUnique({
    where: { id: commentId },
  });
};

exports.getCommentsForPost = async (postId) => {
  return await prisma.comment.findMany({
    where: { postId: postId },
  });
};

exports.getCommentsByUser = async (userId) => {
  return await prisma.comment.findMany({
    where: { userId: userId },
  });
};

exports.getAllComments = async () => {
  return await prisma.comment.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};


exports.updateComment = async (commentId, commentData) => {
  return await prisma.comment.update({
    where: { id: commentId },
    data: commentData,
  });
};

exports.deleteComment = async (commentId) => {
  return await prisma.comment.delete({
    where: { id: commentId },
  });
};
