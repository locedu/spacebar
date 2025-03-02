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
    include: {
      user: {
        select: {
          name: true,
        },
      },
      comments: true,
      likes: true,
    },
  });
};



exports.getAllPosts = async () => {
  return await prisma.post.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
      comments: true,
      likes: true,
    },
  });
};


exports.getAllPostsWithLikesCount = async () => {
  return await prisma.post.findMany({
    include: {
      user: {
        select: {
          name: true,  // Include the name of the user (or username if you prefer)
        }
      },
      _count: {
        select: { likes: true },  // Count the number of likes for each post
      },
    },
    orderBy: {
      updatedAt: 'desc',  // Sort by 'updatedAt' in descending order
    },
  });
};



exports.getPostsLikedByUser = async (userId) => {
  return await prisma.post.findMany({
    where: {
      likes: {
        some: {
          userId: userId,  // Filter posts liked by this user
        },
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
