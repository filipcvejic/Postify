import mongoose, { Schema } from "mongoose";

enum Status {
  Pending,
  Accepted,
}

const userFriendSchema = new Schema({
  user1: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: Number,
});

export const UserFriend = mongoose.model("UserFriend", userFriendSchema);

export const getUserFriends = (userId: string) =>
  UserFriend.find({ $or: [{ user1: userId }, { user2: userId }] });
export const isAlreadyFriend = (user1: string, user2: string) =>
  UserFriend.findOne({
    $or: [
      { user1, user2 },
      { user2, user1 },
    ],
  });
export const createUserFriend = async (user1: string, user2: string) => {
  console.log(await isAlreadyFriend(user1, user2));

  if (!(await isAlreadyFriend(user1, user2))) {
    await new UserFriend({ user1, user2, status: Status.Pending }).save();
  }
};
export const acceptFriend = (user1: string, user2: string) =>
  UserFriend.findOneAndUpdate(
    {
      $or: [
        { user1, user2 },
        { user2, user1 },
      ],
    },
    { status: Status.Accepted }
  );

export const declineFriend = (user1: string, user2: string) =>
  UserFriend.findOneAndDelete({
    $or: [
      { user1, user2 },
      { user2, user1 },
    ],
  });
