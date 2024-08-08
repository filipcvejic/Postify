import { RequestHandler } from "express";
import { getUserById } from "../models/userModel";
import { throwError } from "../helpers/throwError";
import {
  acceptFriend,
  createUserFriend,
  declineFriend,
} from "../models/friendModel";

export const acceptFriendRequest: RequestHandler = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { friendId } = req.params;

    const currentUser = await getUserById(userId);

    if (!currentUser) {
      return throwError("Cannot find your account", 404);
    }

    const friendUser = await getUserById(friendId);

    if (!friendUser) {
      return throwError("Cannot find the user's account", 404);
    }

    await acceptFriend(currentUser._id.toString(), friendUser._id.toString());

    return res.status(200).json({
      message: `You and ${friendUser.username} are now friends!`,
      friend: friendUser,
    });
  } catch (err) {
    next(err);
  }
};

export const sendFriendRequest: RequestHandler = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { friendId } = req.params;

    const currentUser = await getUserById(userId);

    if (!currentUser) {
      return throwError("Cannot find your account", 404);
    }

    const friendUser = await getUserById(friendId);

    if (!friendUser) {
      return throwError("Cannot find the user's account", 404);
    }

    await createUserFriend(
      currentUser._id.toString(),
      friendUser._id.toString()
    );

    return res.status(200).json({
      message: `You successfully sent a friend request to ${friendUser.username}.`,
      friend: friendUser,
    });
  } catch (err) {
    next(err);
  }
};

export const declineFriendRequest: RequestHandler = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { friendId } = req.params;

    const currentUser = await getUserById(userId);

    if (!currentUser) {
      return throwError("Cannot find your account", 404);
    }

    const friendUser = await getUserById(friendId);

    if (!friendUser) {
      return throwError("Cannot find the user's account", 404);
    }

    await declineFriend(currentUser._id.toString(), friendUser._id.toString());

    return res.status(200).json({
      message: `You successfully declined ${friendUser.username}'s friend request.`,
      friend: friendUser,
    });
  } catch (err) {
    next(err);
  }
};
