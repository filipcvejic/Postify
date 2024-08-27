import { Request, Response, NextFunction } from "express";
import { throwError } from "../helpers/throwError";
import { IComment } from "../interfaces/IComment";
import { createComment, editCommentById } from "../models/commentModel";

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