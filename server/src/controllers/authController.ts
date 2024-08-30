import { RequestHandler } from "express";
import { throwError } from "../helpers/throwError";
import { comparePasswords, hashPassword } from "../helpers/hashPassword";
import { createUser, getUserByEmail } from "../models/userModel";
import jwt, { JwtPayload } from "jsonwebtoken";

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

    const accessToken = jwt.sign(
      {
        UserInfo: {
          _id: foundUser._id,
          username: foundUser.username,
          email: foundUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    console.log(accessToken);

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user: foundUser });
  } catch (err) {
    next(err);
  }
};

export const refresh: RequestHandler = (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return throwError("Unauthorized", 401);

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err: Error | null, decoded: string | JwtPayload | undefined) => {
      try {
        if (err) return throwError("Forbidden", 403);

        if (decoded && typeof decoded !== "string") {
          const foundUser = await getUserByEmail(decoded.email);

          if (!foundUser) return throwError("Unauthorized", 401);

          const accesToken = jwt.sign(
            {
              UserInfo: {
                username: foundUser.username,
                email: foundUser.email,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
          );

          res.json({ accesToken });
        } else {
          return throwError("Invalid token", 400);
        }
      } catch (err) {
        next(err);
      }
    }
  );
};

export const logout: RequestHandler = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return throwError("", 204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: "Cookie cleared" });
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
