import { Button, Card, Grid2, Stack, Typography } from "@mui/material";
import React from "react";

export default function FriendRequestsList() {
  const requests = [
    {
      id: 3,
      fullName: "Hajia Bintu",
      nickname: "@haijabintu",
      image: "Neka slika",
    },
    {
      id: 5,
      fullName: "Filip Cvejic",
      nickname: "@filip.cvejic",
      image: "Neka slika",
    },
  ];

  return (
    <Grid2 maxWidth={300}>
      <Typography my={2}>Requests</Typography>
      {requests.map((request) => (
        <Card sx={{ p: 2, borderRadius: 4 }} key={request.id}>
          <Stack gap={2}>
            <Grid2 container gap={2} alignItems={`center`}>
              <Grid2>
                <Typography>Slika</Typography>
              </Grid2>
              <Grid2>
                <Stack>
                  <Typography fontWeight={600}>{request.fullName}</Typography>
                  <Typography color={`hsl(252 , 15% , 65%)`}>
                    {request.nickname}
                  </Typography>
                </Stack>
              </Grid2>
            </Grid2>
            <Grid2 container gap={2}>
              <Grid2>
                <Button
                  variant={`contained`}
                  sx={{
                    background: `hsl(252, 75% , 60%)`,
                    borderRadius: 20,
                    paddingInline: 3,
                  }}
                >
                  Accept
                </Button>
              </Grid2>
              <Grid2>
                <Button
                  variant={`contained`}
                  sx={{
                    background: `hsl(252 , 30% , 95%)`,
                    borderRadius: 20,
                    paddingInline: 3,
                    color: "black",
                  }}
                >
                  Decline
                </Button>
              </Grid2>
            </Grid2>
          </Stack>
        </Card>
      ))}
    </Grid2>
  );
}
