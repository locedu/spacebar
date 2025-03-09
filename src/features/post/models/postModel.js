const prisma = require("../../../config/prismaClient");
const notificationModel = require("../../notification/models/notificationModel"); // Import notification model

// Constants for notification type
const NOTIFICATION_TYPES = {
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
      userId: friendId,         // Friend's user ID
      targetId: post.id,        // ID of the post being notified about
      targetType: NOTIFICATION_TYPES.POST, // Use constant for type
      createdAt: new Date(),
    }));

    // Step 2.3: Create notifications for each friend
    await notificationModel.createNotifications(notifications);  // Using the correct method for creating multiple notifications
  }

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

  // Step 2: Get the list of friend IDs for the authenticated user
  let friendIds = await prisma.userFriends.findMany({
    where: {
      OR: [
        { userId: userId },  // When the authenticated user is the "userId"
        { friendId: userId }, // When the authenticated user is the "friendId"
      ],
    },
    select: {
      userId: true,
      friendId: true,
    },
  }).then((friends) => {
    return friends.map((f) => (f.userId === userId ? f.friendId : f.userId));
  });

  // Step 3: Automatically add the authenticated user's ID to the friend list to allow visibility to their own posts
  friendIds.push(userId); // This ensures the user can see their own posts

  // Step 4: Retrieve all friends' posts and filter based on friend relationships
  const friendPosts = await prisma.post.findMany({
    where: {
      visibility: 'friends',
      userId: { in: friendIds },  // Filter posts by friend IDs
    },
    include: {
      user: {
        select: {
          name: true,
          id: true,
        },
      },
      comments: true,
      likes: true,
    },
  }).then(posts => posts.map(post => ({ ...post, friendLabel: "friend's post" }))); // Label friend posts as "friend's post"

  // Step 5: Combine List A (public posts) and List C (friends' posts) and return
  return [...publicPosts, ...friendPosts];
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
