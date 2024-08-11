import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { throwError } from "../helpers/throwError";

export const verifyJWT: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
    return throwError("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err: Error | null, decoded: string | JwtPayload | undefined) => {
      if (err) return throwError("Forbidden", 403);

      if (decoded && typeof decoded !== "string") {
        req.user = decoded.UserInfo;
        next();
      } else {
        return throwError("Invalid token", 400);
      }
    }
  );
};
