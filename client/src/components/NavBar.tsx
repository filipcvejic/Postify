"use client";

import {
  Grid2,
  ListItemIcon,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

import { useRouter } from "next/navigation";

function NavBar() {
  const router = useRouter();

  const navigations = [
    {
      title: "Home",
      link: "/",
      icon: HomeOutlinedIcon,
    },
    {
      title: "Notifications",
      link: "/notifications",
      icon: NotificationsOutlinedIcon,
    },
    {
      title: "Messages",
      link: "/messages",
      icon: MailOutlineOutlinedIcon,
    },
    {
      title: "Bookmarks",
      link: "/bookmarks",
      icon: BookmarkBorderOutlinedIcon,
    },
    {
      title: "Theme",
      link: "/theme",
      icon: ColorLensOutlinedIcon,
    },
    {
      title: "Settings",
      link: "/settings",
      icon: SettingsOutlinedIcon,
    },
  ];

  return (
    <Stack spacing={2}>
      <Grid2
        container
        alignItems={`center`}
        gap={2}
        p={2}
        bgcolor={`white`}
        borderRadius={3}
      >
        <Grid2>
          <Typography>Slika</Typography>
        </Grid2>
        <Grid2>
          <Stack>
            <Typography>Filip Cvejic</Typography>
            <Typography>@filipcvejic</Typography>
          </Stack>
        </Grid2>
      </Grid2>
      <Grid2
        container
        justifyContent={`center`}
        alignItems={`center`}
        bgcolor={`white`}
        borderRadius={3}
      >
        <MenuList sx={{ width: `100%`, p: 0, height: "100%" }}>
          {navigations.map((navigation, i) => {
            const isActive = router.pathname === navigation.link;

            return (
              <MenuItem
                key={i}
                sx={{
                  borderLeft: isActive ? "4px solid #9c27b0" : "none",
                  paddingInline: 5,
                  paddingBlock: 3,
                  backgroundColor: isActive ? "#EAE8E9" : "inherit",
                  ":hover": {
                    bgcolor: "#EAE8E9",
                  },
                  gap: 2,
                }}
              >
                <ListItemIcon>
                  <navigation.icon
                    sx={{ fontSize: 32 }}
                    style={{ fill: isActive ? `#9c27b0` : "" }}
                  />
                </ListItemIcon>
                <Link href={navigation.link}>
                  <Typography
                    color={isActive ? `#9c27b0` : ""}
                    fontSize={18}
                    fontWeight={`600`}
                  >
                    {navigation.title}
                  </Typography>
                </Link>
              </MenuItem>
            );
          })}
        </MenuList>
      </Grid2>
    </Stack>
  );
}

export default NavBar;
