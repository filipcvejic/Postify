import mongoose, { Schema } from "mongoose";
import { IPost } from "../interfaces/IPost";

const postSchema: Schema<IPost> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
});

export const Post = mongoose.model<IPost>("Post", postSchema);

export const getPosts = () => Post.find().lean();
export const createPost = (values: IPost) =>
  new Post(values).save().then((post) => post.toObject());
export const getPostById = (id: string) => Post.findById(id).lean();
export const editPostById = (id: string, values: IPost) =>
  Post.findByIdAndUpdate(id, values);
export const deletePostById = (id: string) => Post.findByIdAndDelete(id);
