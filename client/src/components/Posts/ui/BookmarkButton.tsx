import { useBookmarksStore } from "@/app/useBookmarksStore";
import { BookmarkBorder, BookmarkOutlined } from "@mui/icons-material";
import { useStore } from "zustand";
import PostBottomActionsIconButton from "./PostBottomActionsIconButton";

function PostBookmarkButton({ postId, saved }) {
  const { savePost, unsavePost } = useStore(
    useBookmarksStore,
    (state) => state
  );

  const handleSavePost = () => {
    if (saved) unsavePost(postId);
    else savePost(postId);
  };

  return (
    <PostBottomActionsIconButton
      icon={saved ? <BookmarkOutlined /> : <BookmarkBorder />}
      postId={postId}
      onClick={handleSavePost}
    />
  );
}

export default PostBookmarkButton;
