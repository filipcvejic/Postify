import { Button, styled } from "@mui/material";

const NoHoverButton = styled(Button)({
  "&:hover": {
    backgroundColor: "inherit",
    boxShadow: "none",
  },
});

export default NoHoverButton;
