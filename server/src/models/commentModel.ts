import mongoose, { Schema } from "mongoose";
import { IComment } from "../interfaces/IComment";

const CommentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Comment = mongoose.model("Comment", CommentSchema);

export const getComments = () => Comment.find().select("-__v").lean();
export const getCommentById = (id: string) =>
  Comment.findById(id).select("-__v");
export const createComment = async (values: IComment): Promise<IComment> => {
  const comment = new Comment(values);
  return await comment.save().then((savedComment) => savedComment.toObject());
};
export const editCommentById = (id: string, values: IComment) =>
  Comment.findByIdAndUpdate(id, values);
export const deleteCommentById = (id: string) => Comment.findByIdAndDelete(id);
