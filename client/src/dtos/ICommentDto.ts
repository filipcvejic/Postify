export interface ICommentDto {
  _id: string;
  postId: string;
  parentId?: string;
  userId: string;
  text: string;
}
