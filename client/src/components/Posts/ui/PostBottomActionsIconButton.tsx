import NoHoverButton from "@/components/NoHoverButton/ui/NoHoverButton";
import { Typography } from "@mui/material";
import { IPostBottomActionsIconButtonProps } from "../interfaces/IPostBottomActionsIconButtonProps";

function PostBottomActionsIconButton({
  icon,
  counts,
  onClick,
}: IPostBottomActionsIconButtonProps) {
  return (
    <NoHoverButton
      color={`inherit`}
      sx={{ p: 0, minWidth: "max-content" }}
      onClick={onClick}
    >
      {icon}
      {counts && <Typography marginLeft={0.5}>{counts}</Typography>}
    </NoHoverButton>
  );
}

export default PostBottomActionsIconButton;
