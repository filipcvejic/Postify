import { getUserById } from "../models/userModel";
import { throwError } from "../helpers/throwError";
import {
  acceptFriendRequest,
  createFriendship,
  declineFriendRequest,
  removeFriend,
} from "../models/friendModel";
import asyncHandler from "express-async-handler";

export const acceptFriendRequestHandler = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return throwError("User not authenticated", 401);
  }

  const { friendId } = req.params;

  const currentUser = await getUserById(user._id);
  if (!currentUser) {
    return throwError("Cannot find your account", 404);
  }

  const friendUser = await getUserById(friendId);
  if (!friendUser) {
    return throwError("Cannot find the user's account", 404);
  }

  await acceptFriendRequest(
    currentUser._id.toString(),
    friendUser._id.toString()
  );

  res.status(200).json({
    message: `You and ${friendUser.username} are now friends!`,
    friend: friendUser,
  });
});

export const sendFriendRequestHandler = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return throwError("User not authenticated", 401);
  }

  const { friendId } = req.params;

  const currentUser = await getUserById(user._id);

  if (!currentUser) {
    return throwError("Cannot find your account", 404);
  }

  const friendUser = await getUserById(friendId);

  if (!friendUser) {
    return throwError("Cannot find the user's account", 404);
  }

  await createFriendship(currentUser._id.toString(), friendUser._id.toString());

  res.status(200).json({
    message: `You successfully sent a friend request to ${friendUser.username}.`,
    friend: friendUser,
  });
});

export const declineFriendRequestHandler = asyncHandler(
  async (req, res, next) => {
    const user = req.user;

    if (!user) {
      return throwError("User not authenticated", 401);
    }

    const { friendId } = req.params;

    const currentUser = await getUserById(user._id);

    if (!currentUser) {
      return throwError("Cannot find your account", 404);
    }

    const friendUser = await getUserById(friendId);

    if (!friendUser) {
      return throwError("Cannot find the user's account", 404);
    }

    await declineFriendRequest(
      currentUser._id.toString(),
      friendUser._id.toString()
    );

    res.status(200).json({
      message: `You successfully declined ${friendUser.username}'s friend request.`,
      friend: friendUser,
    });
  }
);

export const removeFriendHandler = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return throwError("User not authenticated", 401);
  }

  const { friendId } = req.params;

  const currentUser = await getUserById(user._id.toString());

  if (!currentUser) {
    return throwError("Cannot find your account", 404);
  }

  const friendUser = await getUserById(friendId);

  if (!friendUser) {
    return throwError("Cannot find the user's account", 404);
  }

  await removeFriend(currentUser._id.toString(), friendUser._id.toString());

  res.status(200).json({
    message: `You have removed ${friendUser.username} from your friends list.`,
  });
});
