import { RequestHandler } from "express";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../models/userModel.js";
import { comparePasswords, hashPassword } from "../helpers/hashPassword.js";
import { throwError } from "../helpers/throwError.js";
import {
  acceptFriend,
  createUserFriend,
  declineFriend,
  isAlreadyFriend,
  UserFriend,
} from "../models/friendModel.js";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return throwError("Please provide valid credentials", 400);
    }

    const foundUser = await getUserByEmail(email);

    if (!foundUser) {
      return throwError("User not found", 404);
    }

    const isPasswordValid = await comparePasswords(
      password,
      foundUser.password
    );

    if (!isPasswordValid) {
      throwError("Invalid credentials", 401);
    }

    res.status(200).json({ user: foundUser });
  } catch (err) {
    next(err);
  }
};

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return throwError("Please provide valid credentials", 400);
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return throwError("This user already exists", 409);
    }

    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      email,
      username,
      password: hashedPassword,
    });

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

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
