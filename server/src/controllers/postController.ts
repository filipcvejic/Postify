import {
  getPosts,
  createPost,
  editPostById,
  Post,
  getPostById,
} from "../models/postModel";
import { throwError } from "../helpers/throwError";
import { Comment } from "../models/commentModel";
import asyncHandler from "express-async-handler";
import { getUserById } from "../models/userModel";
import { Types } from "mongoose";

export const addPost = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const image = req.file as Express.MulterS3File;
  const { description } = req.body;

  if (!user) return throwError("User not authenticated", 401);

  if (!description && !image)
    return throwError("At least one field must be filled", 400);

  const newPost = await createPost({
    userId: user._id,
    description,
    image: image?.location,
  });

  res.status(200).json(newPost);
});

export const editPost = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { postId } = req.params;
  const image = req.file as Express.MulterS3File;
  const { title, description } = req.body;

  if (!user) return throwError("User not authenticated", 401);

  if (!title && !description && !image)
    return throwError("At least one field must be filled", 400);

  const editedPost = await editPostById(postId, {
    userId: user._id,
    description: description ?? null,
    image: image?.location,
  });

  res.status(200).json({ message: "Post has edited successfully", editedPost });
});

export const getPostsWithTwoLevelOfComments = asyncHandler(
  async (req, res, next) => {
    const posts = await getPosts();

    if (!posts) return throwError("No posts found", 404);

    const firstLevelComments = await Comment.find({
      postId: { $in: posts.map((post) => post._id) },
      parentId: null,
    }).lean();

    console.log(firstLevelComments);

    // if (!firstLevelComments.length)
    //   return throwError("No first-level comments found", 404);

    const secondLevelComments = await Comment.find({
      parentId: { $in: firstLevelComments.map((comment) => comment._id) },
    }).lean();

    // if (!secondLevelComments.length)
    //   return throwError("No second-level comments found", 404);

    const postsWithComments = posts.map((post) => {
      const comments = firstLevelComments
        .filter((comment) => comment.postId.toString() === post._id.toString())
        .map((comment) => ({
          ...comment,
          replies: secondLevelComments.filter(
            (reply) => reply.parentId?.toString() === comment._id.toString()
          ),
        }));

      return {
        ...post,
        comments,
      };
    });

    res.status(200).json(postsWithComments);
  }
);

export const likePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { user } = req;

  if (!user) return throwError("User not authenticated", 401);

  const post = await getPostById(postId);

  if (!post) return throwError("Post not found", 404);

  const userId = new Types.ObjectId(user._id);

  if (!post.likes.includes(userId)) {
    post.likes.push(userId);
  }

  await post.save();
});

export const unlikePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { user } = req;

  if (!user) return throwError("User not authenticated", 401);

  const post = await Post.findById(postId);

  if (!post) return throwError("Post not found", 404);

  post.likes = post.likes?.filter((like) => like.toString() !== user._id);

  await post.save();
});
