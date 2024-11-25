import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Grid2, Typography } from "@mui/material";
import { useState } from "react";
import { handleApiError, postifyApi } from "@/api/postifyApi";

function LikeButton({ postId, liked, likesCount }) {
  const [isLiked, setIsLiked] = useState(liked);

  const handleLikePost = (postId: string) => {
    postifyApi.post(`/posts/${postId}/like`).catch(handleApiError);

    setIsLiked((prev) => !prev);
  };

  return (
    <Grid2 container onClick={() => handleLikePost(postId)}>
      {isLiked ? <Favorite /> : <FavoriteBorder />}
      <Typography>{likesCount}</Typography>
    </Grid2>
  );
}

export default LikeButton;
