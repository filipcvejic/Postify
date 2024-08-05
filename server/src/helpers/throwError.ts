import { CustomError } from "../interfaces/ICustomError";

export const throwError = (message: string, status: number): never => {
  const error = new Error(message) as CustomError;
  error.status = status;
  throw error;
};
