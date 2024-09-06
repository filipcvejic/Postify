import "express";
import { S3 } from "aws-sdk";

declare global {
  namespace Express {
    interface RequestUser {
      _id: string;
      username: string;
      email: string;
    }

    interface MulterS3File extends S3.Object {
      location?: string;
    }

    interface Request {
      user?: RequestUser;
      file?: MulterS3File;
    }
  }
}
