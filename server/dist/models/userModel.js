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
    friendRequests: [{ type: Schema.Types.ObjectId, ref: "Request" }],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "Friend",
        },
    ],
});
export const User = mongoose.model("User", userSchema);
export const getUsers = () => User.find();
export const getUserByEmail = (email) => User.findOne({ email });
export const getUserById = (id) => User.findById(id);
export const createUser = (values) => new User(values).save().then((user) => user.toObject());
export const deleteUserById = (id) => User.findByIdAndDelete(id);
export const updateUserById = (id, values) => User.findByIdAndUpdate(id, values);
