"use client";

import {
  Container,
  Grid2,
  ListItemIcon,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PostsList from "@/components/postsList";

export default function Home() {
  const pathname = usePathname();

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
      title: "Settings",
      link: "/settings",
      icon: SettingsOutlinedIcon,
    },
  ];

  return (
    <Grid2 bgcolor={`#EAE8E9`}>
      <Container>
        <Grid2 container p={2} spacing={2}>
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
              pt={1}
            >
              <MenuList sx={{ width: `100%` }}>
                {navigations.map((navigation, i) => {
                  const isActive = pathname === navigation.link;

                  return (
                    <MenuItem
                      key={i}
                      sx={{
                        borderLeft: isActive ? "4px solid #9c27b0" : "none",
                        paddingInline: 5,
                        backgroundColor: isActive ? "#EAE8E9" : "inherit",
                      }}
                    >
                      <ListItemIcon>
                        <navigation.icon
                          style={{ fill: isActive ? `#9c27b0` : "" }}
                        />
                      </ListItemIcon>
                      <Link href={navigation.link}>
                        <Typography color={isActive ? `#9c27b0` : ""}>
                          {navigation.title}
                        </Typography>
                      </Link>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Grid2>
          </Stack>
          <PostsList />
        </Grid2>
      </Container>
    </Grid2>
  );
}
