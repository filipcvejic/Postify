import mongoose, { Schema } from "mongoose";

const BookmarkSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

export const Bookmark = mongoose.model("Bookmark", BookmarkSchema);
