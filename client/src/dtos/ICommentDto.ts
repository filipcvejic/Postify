export interface ICommentDto {
  postId: string;
  parentId?: string;
  userId: string;
  text: string;
}
