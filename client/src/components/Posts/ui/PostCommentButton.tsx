import PostBottomActionsIconButton from "./PostBottomActionsIconButton";
import { Comment } from "@mui/icons-material";

function PostCommentButton({ postId }) {
  return (
    <PostBottomActionsIconButton
      postId={postId}
      icon={<Comment />}
      counts={123}
      onClick={() => console.log("ops")}
    />
  );
}

export default PostCommentButton;
