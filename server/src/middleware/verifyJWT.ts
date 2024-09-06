import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { throwError } from "../helpers/throwError";

export const verifyJWT: RequestHandler = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return throwError("Unauthorized", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (decoded && typeof decoded !== "string") {
      req.user = decoded.UserInfo;
      next();
    } else {
      return throwError("Invalid token", 400);
    }
  } catch (err) {
    return next(err);
  }
};
