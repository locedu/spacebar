const postModel = require("../models/postModel");

exports.createPost = async (postData, user) => {
  // Validate required fields
  if (!postData.content || !postData.title) {
    throw new Error("Title and content are required");
  }

  // Create a new post by calling the model
  return await postModel.createPost({ ...postData, userId: user.id });
};

exports.getPost = async (postId) => {
  return await postModel.getPost(postId);
};

exports.getAllPosts = async () => {
  return await postModel.getAllPosts();
};

exports.getAllPostsWithLikesCount = async () => {
  return await postModel.getAllPostsWithLikesCount();
};

exports.updatePost = async (postId, postData, user) => {
  const existingPost = await postModel.getPost(postId);
  if (!existingPost) {
    throw new Error("Post not found");
  }
  if (existingPost.userId !== user.id) {
    throw new Error("Unauthorized to update this post");
  }

  return await postModel.updatePost(postId, postData);
};

exports.deletePost = async (postId, user) => {
  const post = await postModel.getPost(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  if (post.userId !== user.id) {
    throw new Error("Unauthorized to delete this post");
  }

  return await postModel.deletePost(postId);
};
