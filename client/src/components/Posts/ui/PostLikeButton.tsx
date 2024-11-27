import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useState } from "react";
import { handleApiError, postifyApi } from "@/api/postifyApi";
import PostBottomActionsIconButton from "./PostBottomActionsIconButton";

function PostLikeButton({ postId, liked, likesCount }) {
  const [isLiked, setIsLiked] = useState(liked);

  const handleLikePost = (postId: string) => {
    postifyApi.post(`/posts/${postId}/like`).catch(handleApiError);

    setIsLiked((prev) => !prev);
  };

  return (
    <PostBottomActionsIconButton
      postId={postId}
      icon={isLiked ? <Favorite /> : <FavoriteBorder />}
      counts={likesCount}
      onClick={handleLikePost}
    />
  );
}

export default PostLikeButton;
