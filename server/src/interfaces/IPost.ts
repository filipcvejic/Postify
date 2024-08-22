import mongoose from "mongoose";

export interface IPost {
  userId: mongoose.Types.ObjectId;
  title: String;
  description?: String;
  image?: string;
}
