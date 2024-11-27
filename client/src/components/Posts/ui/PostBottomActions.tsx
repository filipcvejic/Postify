import { Grid2, Stack, Typography } from "@mui/material";
import React from "react";
import LikeButton from "./PostLikeButton";
import { BookmarkBorder, Comment } from "@mui/icons-material";
import PostCommentInput from "./PostCommentInput";
import { IPostBottomActionsProps } from "../interfaces/IPostBottomActionsProps";
import PostBottomActionsIconButton from "./PostBottomActionsIconButton";
import PostBookmarkButton from "./BookmarkButton";
import PostLikeButton from "./PostLikeButton";
import PostCommentButton from "./PostCommentButton";

function PostBottomActions({ post }: IPostBottomActionsProps) {
  return (
    <Stack gap={1}>
      <Grid2 container gap={1}>
        <Typography fontWeight={600}>{post.user.username}</Typography>
        <Typography>{post.description}</Typography>
      </Grid2>
      {post.comments.length > 0 && (
        <Grid2 container>
          <Typography sx={{ cursor: `pointer` }}>
            View all {post.comments.length} comments
          </Typography>
        </Grid2>
      )}
      <Grid2 container key={post._id}>
        <PostCommentInput post={post} />
      </Grid2>
      <Grid2 container justifyContent={`space-between`} alignItems={`center`}>
        <Grid2 container gap={2}>
          <PostLikeButton postId={post._id} liked={false} likesCount={325} />
          <PostCommentButton postId={post._id} commentsCount />
        </Grid2>
        <Grid2>
          <PostBookmarkButton postId={post._id} saved={false} />
        </Grid2>
      </Grid2>
    </Stack>
  );
}

export default PostBottomActions;
