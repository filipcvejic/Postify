import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  comments: [
    {
      type: String,
    },
  ],
});

export const Post = mongoose.model("Post", postSchema);

export const createPost = (values: Record<string, any>) =>
  new Post(values).save().then((post) => post.toObject());
export const getPostById = (id: string) => Post.findById(id);
export const editPostById = (id: string, values: Record<string, any>) =>
  Post.findByIdAndUpdate(id, values);
export const deletePostById = (id: string) => Post.findByIdAndDelete(id);
