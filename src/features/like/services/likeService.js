const likeModel = require("../models/likeModel");

exports.likePost = async (postId, user) => {
  // Ensure the user hasn't already liked the post
  const existingLike = await likeModel.getLikeByUserAndPost(user.id, postId);
  if (existingLike) {
    throw new Error("You already liked this post");
  }

  return await likeModel.likePost({ userId: user.id, postId });
};

exports.unlikePost = async (postId, user) => {
  const existingLike = await likeModel.getLikeByUserAndPost(user.id, postId);
  if (!existingLike) {
    throw new Error("You haven’t liked this post yet");
  }

  return await likeModel.unlikePost(existingLike.id);
};

exports.getLikesForPost = async (postId) => {
  return await likeModel.getLikesForPost(postId);
};

exports.getLikesByUser = async (userId) => {
  return await likeModel.getLikesByUser(userId);
};
