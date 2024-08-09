import { JwtPayload } from "jsonwebtoken";

declare namespace Express {
  interface RequestUser {
    username: string;
    email: string;
  }

  export interface Request {
    user?: RequestUser;
  }
}
