import { NextFunction, Request, Response } from "express";
import { CustomError } from "../interfaces/ICustomError";

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    message,
  });
};
