import mongoose, { Schema } from "mongoose";

enum Status {
  Pending,
  Accepted,
}

const userFriendSchema = new Schema({
  user1: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user2: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  initiator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const UserFriend = mongoose.model("UserFriend", userFriendSchema);

export const getUserFriends = async (userId: string) =>
  UserFriend.find({
    $or: [{ user1: userId }, { user2: userId }],
    status: Status.Accepted,
  })
    .select("-__v")
    .lean();

export const isAlreadyFriend = (user1: string, user2: string) =>
  UserFriend.findOne({
    $or: [
      { user1, user2 },
      { user2, user1 },
    ],
  });

export const getPendingFriendRequests = (userId: string) =>
  UserFriend.find({
    $or: [
      { user1: userId, status: Status.Pending, initiator: { $ne: userId } },
      { user2: userId, status: Status.Pending, initiator: { $ne: userId } },
    ],
  }).lean();

export const createFriendship = async (
  currentUserId: string,
  requestedUserId: string
) => {
  if (!(await isAlreadyFriend(currentUserId, requestedUserId))) {
    await new UserFriend({
      user1: currentUserId,
      user2: requestedUserId,
      status: Status.Pending,
      initiator: currentUserId,
    }).save();
  }
};

export const acceptFriendRequest = (
  currentUserId: string,
  requesterUserId: string
) =>
  UserFriend.findOneAndUpdate(
    {
      $or: [
        {
          user1: currentUserId,
          user2: requesterUserId,
          initiator: requesterUserId,
        },
        {
          user2: currentUserId,
          user1: requesterUserId,
          initiator: requesterUserId,
        },
      ],
    },
    { status: Status.Accepted }
  );

export const declineFriendRequest = (
  currentUserId: string,
  requesterId: string
) =>
  UserFriend.findOneAndDelete({
    $or: [
      {
        user1: currentUserId,
        user2: requesterId,
        status: Status.Pending,
        initiator: requesterId,
      },
      {
        user2: currentUserId,
        user1: requesterId,
        status: Status.Pending,
        initiator: requesterId,
      },
    ],
  });

export const removeFriend = (user1: string, user2: string) =>
  UserFriend.findOneAndDelete({
    $or: [
      { user1, user2, status: Status.Accepted },
      { user2, user1, status: Status.Accepted },
    ],
  });
