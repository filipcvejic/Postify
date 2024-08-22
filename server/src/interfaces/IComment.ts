import mongoose from "mongoose";

export interface IComment {
  postId: mongoose.Types.ObjectId;
  parentId?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  text: string;
  createdAt?: Date;
}
