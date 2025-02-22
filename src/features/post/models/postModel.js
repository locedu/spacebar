const prisma = require("../../../config/prismaClient");

// Create a new post
exports.createPost = async (postData) => {
  return await prisma.post.create({
    data: postData,
  });
};

exports.getPost = async (postId) => {
  return await prisma.post.findUnique({
    where: { id: postId },
  });
};

exports.getAllPosts = async () => {
  return await prisma.post.findMany(); // Get all posts
};

exports.getAllPostsWithLikesCount = async () => {
  return await prisma.post.findMany({
    include: {
      _count: {
        select: { likes: true },  // Count the number of likes for each post
      },
    },
  });
};

exports.updatePost = async (postId, postData) => {
  return await prisma.post.update({
    where: { id: postId },
    data: postData,
  });
};

exports.deletePost = async (postId) => {
  return await prisma.post.delete({
    where: { id: postId },
  });
};
