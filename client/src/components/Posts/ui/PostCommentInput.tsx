import { postifyApi } from "@/api/postifyApi";
import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { IPostCommentInputProps } from "../interfaces/IPostCommentInputProps";

function PostCommentInput({ post }: IPostCommentInputProps) {
  const [comment, setComment] = useState("");

  const handleChangeComment = (value: string) => setComment(value);

  const handleAddComment = async (postId: string, parentId?: string) => {
    if (!comment.trim()) return;

    await postifyApi.post("/comments", {
      postId,
      parentId,
      text: comment,
    });
  };

  return (
    <TextField
      onChange={(e) => handleChangeComment(e.target.value)}
      label={`Add a comment...`}
      size={`small`}
      fullWidth
      sx={{
        borderRadius: "12px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
        },
      }}
      slotProps={{
        input: {
          endAdornment: comment.trim().length > 0 && (
            <InputAdornment position={`end`}>
              <Button onClick={() => handleAddComment(post._id)}>Post</Button>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default PostCommentInput;
