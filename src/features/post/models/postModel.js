const prisma = require("../../../config/prismaClient");

// Create a new post
exports.createPost = async (postData) => {
  return await prisma.post.create({
    data: postData,
  });
};

// Get a single post by ID
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

// Function to check if the authenticated user is a friend of the author
async function isFriend(userId, authorId) {
  const friendship = await prisma.userFriends.findFirst({
    where: {
      OR: [
        { userId: userId, friendId: authorId },
        { userId: authorId, friendId: userId },
      ],
    },
  });
  return friendship ? true : false;
}

// Get all posts - combining public posts and friends' posts
exports.getAllPosts = async (userId) => {
  // Step 1: Retrieve all public posts and store in List A
  const publicPosts = await prisma.post.findMany({
    where: { visibility: 'public' },
    include: {
      user: {
        select: {
          name: true,
          id: true, // Include the author's userId for comparison
        },
      },
      comments: true,
      likes: true,
    },
  }).then(posts => posts.map(post => ({ ...post, friendLabel: 'public' }))); // Label public posts as "public"

  // Step 2: Retrieve all non-public posts (friends-only posts) and store in List B
  const friendPosts = await prisma.post.findMany({
    where: {
      visibility: 'friends',
    },
    include: {
      user: {
        select: {
          name: true,
          id: true, // Include the author's userId for comparison
        },
      },
      comments: true,
      likes: true,
    },
  }).then(posts => posts.map(post => ({
    ...post,
    friendLabel: 'not visible' // Default value for friend posts (we'll check if the user is a friend below)
  })));

  // Step 3: Filter List B based on whether the authenticated user is a friend of the author
  const friendPostsFiltered = await Promise.all(friendPosts.map(async post => {
    const isFriendOfAuthor = await isFriend(userId, post.userId);
    if (isFriendOfAuthor) {
      post.friendLabel = "friend's post"; // Label as "friend's post" if the post's author is a friend
    }
    return isFriendOfAuthor ? post : null; // Only include the post if the user is a friend
  }));

  // Step 4: Filter out any null entries (non-friend posts) from List C
  const friendPostsOnly = friendPostsFiltered.filter(post => post !== null);

  // Step 5: Combine List A and List C (public posts + friend posts) and return
  return [...publicPosts, ...friendPostsOnly];
};

exports.getAllPostsWithLikesCount = async () => {
  return await prisma.post.findMany({
    include: {
      user: {
        select: {
          name: true,
        }
      },
      _count: {
        select: { likes: true },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
};

exports.getPostsLikedByUser = async (userId) => {
  return await prisma.post.findMany({
    where: {
      likes: {
        some: {
          userId: userId,
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
