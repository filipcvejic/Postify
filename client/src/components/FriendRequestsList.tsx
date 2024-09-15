import { Button, Card, Grid2, Stack, Typography } from "@mui/material";
import React from "react";

export default function FriendRequestsList() {
  return (
    <Grid2 maxWidth={300}>
      <Typography my={2}>Requests</Typography>
      <Card sx={{ p: 2, borderRadius: 4 }}>
        <Stack gap={1}>
          <Grid2 container gap={2} alignItems={`center`}>
            <Grid2>
              <Typography>Slika</Typography>
            </Grid2>
            <Grid2>
              <Stack>
                <Typography>Hajia Bintu</Typography>
                <Typography>@hajiabintu</Typography>
              </Stack>
            </Grid2>
          </Grid2>
          <Grid2 container gap={2}>
            <Grid2>
              <Button
                variant={`contained`}
                sx={{ background: `#8F3FD3`, borderRadius: 20 }}
              >
                Accept
              </Button>
            </Grid2>
            <Grid2>
              <Button
                variant={`contained`}
                sx={{ background: `#C6C6C6`, borderRadius: 20 }}
              >
                Decline
              </Button>
            </Grid2>
          </Grid2>
        </Stack>
      </Card>
    </Grid2>
  );
}
