import { Request, Response, NextFunction } from "express";
import { throwError } from "../helpers/throwError";
import { IComment } from "../interfaces/IComment";
import {
  createComment,
  editCommentById,
  getCommentById,
} from "../models/commentModel";
import asyncHandler from "express-async-handler";
import { Types } from "mongoose";

export const addComment = asyncHandler(
  async (req: Request<{}, {}, IComment>, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) return throwError("User not authenticated", 401);

    const { postId, parentId, text } = req.body;

    console.log(postId, user._id, text);

    if (!postId || !user._id || !text) {
      return throwError("Post ID, User ID and Text are required.", 400);
    }

    const newComment = await createComment({
      postId,
      parentId,
      userId: user._id,
      text,
    });

    res.status(200).json(newComment);
  }
);

export const editComment = asyncHandler(
  async (
    req: Request<{ commentId: string }, {}, IComment>,
    res: Response,
    next: NextFunction
  ) => {
    const { commentId } = req.params;
    const updateValues = req.body;

    const updatedComment = await editCommentById(commentId, updateValues);

    res.status(200).json(updatedComment);
  }
);

export const likeComment = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;
  const { user } = req;

  if (!user) return throwError("User not authenticated", 401);

  const comment = await getCommentById(commentId);

  if (!comment) return throwError("Comment not found", 404);

  const userId = new Types.ObjectId(user._id);

  if (!comment.likes.includes(userId)) {
    comment.likes.push(userId);
  }

  await comment.save();
});

export const unlikeComment = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;
  const { user } = req;

  if (!user) return throwError("User not authenticated", 401);

  const comment = await getCommentById(commentId);

  if (!comment) return throwError("Comment not found", 404);

  comment.likes = comment.likes?.filter((like) => like.toString() !== user._id);

  await comment.save();
});
