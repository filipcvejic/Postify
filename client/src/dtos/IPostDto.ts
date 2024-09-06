import { ICommentDto } from "./ICommentDto";

export interface IPostDto {
  _id: string;
  userId: string;
  description?: string;
  image?: string;
  likes: string[];
  comments: ICommentDto[];
}
