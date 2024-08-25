import { RequestHandler } from "express";
import { getPosts, createPost, editPostById } from "../models/postModel";
import { throwError } from "../helpers/throwError";
import { Comment } from "../models/commentModel";

export const addPost: RequestHandler = async (req, res, next) => {
  const userId = req.user._id;
  const { title, description, image } = req.body;

  if (!title || !description || !image)
    return throwError("All fields are required", 400);

  const newPost = await createPost({ userId, title, description, image });

  res.status(200).json(newPost);
};

export const editPost: RequestHandler = async (req, res, next) => {
  const userId = req.user._id;
  const { postId } = req.params;
  const { title, description, image } = req.body;

  if (!title || !description || !image)
    return throwError("All fields are required", 400);

  const editedPost = await editPostById(postId, {
    userId,
    title,
    description,
    image,
  });

  res.status(200).json({ message: "Post has edited successfully", editedPost });
};

export const getPostsWithTwoLevelOfComments: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const posts = await getPosts();

    if (!posts) return throwError("No posts found", 404);

    const firstLevelComments = await Comment.find({
      postId: { $in: posts.map((post) => post._id) },
      parentId: null,
    }).lean();

    if (!firstLevelComments.length)
      return throwError("No first-level comments found", 404);

    const secondLevelComments = await Comment.find({
      parentId: { $in: firstLevelComments.map((comment) => comment._id) },
    }).lean();

    if (!secondLevelComments.length)
      return throwError("No second-level comments found", 404);

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
  } catch (err) {
    next(err);
  }
};
