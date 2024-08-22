import { RequestHandler, Request, Response, NextFunction } from "express";
import { getPosts } from "../models/postModel";
import { throwError } from "../helpers/throwError";
import {
  Comment,
  createComment,
  editCommentById,
} from "../models/commentModel";
import { IComment } from "../interfaces/IComment";

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

export const addComment = async (
  req: Request<{}, {}, IComment>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId, parentId, userId, text } = req.body;

    if (!postId || !userId || !text) {
      return throwError("Post ID, User ID and Text are required.", 400);
    }

    const newComment = await createComment({ postId, parentId, userId, text });

    res.status(200).json(newComment);
  } catch (err) {
    next(err);
  }
};

export const editComment = async (
  req: Request<{ commentId: string }, {}, IComment>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;
    const updateValues = req.body;

    const updatedComment = await editCommentById(commentId, updateValues);

    res.status(200).json(updatedComment);
  } catch (err) {
    next(err);
  }
};
