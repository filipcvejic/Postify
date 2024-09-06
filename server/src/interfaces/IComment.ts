export interface IComment {
  postId: string;
  parentId?: string;
  userId: string;
  text: string;
  createdAt?: Date;
}
