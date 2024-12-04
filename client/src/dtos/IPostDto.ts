import { ICommentDto } from "./ICommentDto";

export interface IPostDto {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  description?: string;
  image?: string;
  likes: string[];
  comments?: ICommentDto[];
}
