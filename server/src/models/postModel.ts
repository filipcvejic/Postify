import mongoose, { Schema } from "mongoose";
import { IPost } from "../interfaces/IPost";

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  description: String,
  image: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
});

export const Post = mongoose.model("Post", postSchema);

export const getPosts = () =>
  Post.find()
    .select("-__v")
    .populate({
      path: "user",
      select: "username",
    })
    .lean();
export const createPost = (values: IPost) =>
  new Post(values).save().then((post) => post.toObject());
export const getPostById = (id: string) => Post.findById(id).select("-__v");
export const editPostById = (id: string, values: IPost) =>
  Post.findByIdAndUpdate(id, values);
export const deletePostById = (id: string) => Post.findByIdAndDelete(id);
