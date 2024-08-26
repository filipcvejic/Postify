import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

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

export const getUsers = () => User.find().lean();
export const getUserByEmail = (email: string) => User.findOne({ email }).lean();
export const getUserById = (id: string) => User.findById(id).lean();
export const createUser = (values: IUser) =>
  new User(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => User.findByIdAndDelete(id);
export const updateUserById = (id: string, values: IUser) =>
  User.findByIdAndUpdate(id, values);
