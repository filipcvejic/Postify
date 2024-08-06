import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);

export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserById = (id: string) => User.findById(id);
export const createUser = (values: Record<string, any>) =>
  new User(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => User.findByIdAndDelete(id);
export const updateUserById = (id: string, values: Record<string, any>) =>
  User.findByIdAndUpdate(id, values);
