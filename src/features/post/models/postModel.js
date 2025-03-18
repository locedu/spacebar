const prisma = require("../../../config/prismaClient");
const notificationModel = require("../../notification/models/notificationModel"); // Import notification model
const activityModel = require("../../activity/models/activityModel"); // Import activity model

// Constants for notification type
const NOTIFICATION_TYPES = {
  POST: 'POST',
  COMMENT: 'COMMENT',
  LIKE: 'LIKE',
  FRIEND: 'FRIEND',
  UN_FRIEND: 'UN_FRIEND',
};

// Constants for activity type
const ACTIVITY_TYPES = {
  POST: 'POST',
  COMMENT: 'COMMENT',
  LIKE: 'LIKE',
  FRIEND: 'FRIEND',
  UN_FRIEND: 'UN_FRIEND',
};

// Create a new post
exports.createPost = async (postData) => {
  // Step 1: Create the post
  const post = await prisma.post.create({
    data: postData,
  });

  // Step 2: If post visibility is 'friends', create notifications for friends
  if (post.visibility === "friends") {
    // Step 2.1: Fetch friends of the user (excluding the user who created the post)
    const friends = await prisma.userFriends.findMany({
      where: {
        OR: [
          { userId: post.userId },
          { friendId: post.userId }
        ],
      },
      select: {
        userId: true,
        friendId: true
      },
    });

    const friendIds = friends
      .map(f => (f.userId === post.userId ? f.friendId : f.userId)) // Collect friend IDs
      .filter(friendId => friendId !== post.userId); // Exclude the post creator

    // Step 2.2: Create a notification for each friend
    const notifications = friendIds.map(friendId => ({
      userId: friendId,
      targetId: post.id,
      targetType: NOTIFICATION_TYPES.POST,
      createdAt: new Date(),
    }));

    // Step 2.3: Create notifications for each friend
    await notificationModel.createNotifications(notifications);
  }

  // Step 3: Log the post activity in Activity table
  await activityModel.createActivity({
    userId: post.userId,
    targetType: ACTIVITY_TYPES.POST,
    targetId: post.id,
    createdAt: new Date(),
  });

  return post;
};

// Get a single post by ID
exports.getPost = async (postId) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: {
      user: {
        select: {
          name: true,
          id: true,
          username: true,
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
  return !!friendship;
}

// Get all posts - combining public posts and friends' posts
exports.getAllPosts = async (userId) => {
  // Step 1: Check if the user is an ADMIN
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  const isAdmin = user?.role === "ADMIN";

  // If the user is an ADMIN, return all posts (public + friends)
  if (isAdmin) {
    return await prisma.post.findMany({
      include: {
        user: {
          select: {
            name: true,
            id: true,
            username: true,
          },
        },
        comments: true,
        likes: true,
      },
    });
  }

  // Step 2: Retrieve all public posts
  const publicPosts = await prisma.post.findMany({
    where: { visibility: 'public' },
    include: {
      user: {
        select: {
          name: true,
          id: true,
          username: true,
        },
      },
      comments: true,
      likes: true,
    },
  }).then(posts => posts.map(post => ({ ...post, friendLabel: 'public' })));

  // Step 3: Get the list of friend IDs for the authenticated user
  let friendIds = await prisma.userFriends.findMany({
    where: {
      OR: [
        { userId: userId },
        { friendId: userId },
      ],
    },
    select: {
      userId: true,
      friendId: true,
    },
  }).then(friends => friends.map(f => (f.userId === userId ? f.friendId : f.userId)));

  // Step 4: Allow the user to see their own posts
  friendIds.push(userId);

  // Step 5: Retrieve all friends' posts
  const friendPosts = await prisma.post.findMany({
    where: {
      visibility: 'friends',
      userId: { in: friendIds },
    },
    include: {
      user: {
        select: {
          name: true,
          id: true,
          username: true,
        },
      },
      comments: true,
      likes: true,
    },
  }).then(posts => posts.map(post => ({ ...post, friendLabel: "friend's post" })));

  // Step 6: Combine and return public + friends' posts
  return [...publicPosts, ...friendPosts];
};

// Get all posts with likes count
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

// Get posts liked by a specific user
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

// Update a post
exports.updatePost = async (postId, postData) => {
  return await prisma.post.update({
    where: { id: postId },
    data: postData,
  });
};

// Delete a post
exports.deletePost = async (postId) => {
  return await prisma.post.delete({
    where: { id: postId },
  });
};
