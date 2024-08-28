"use client";

import { useState } from "react";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { handleApiError, postifyApi } from "@/api/postifyApi";
import { setCredentials } from "@/features/auth/authSlice";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await postifyApi
      .post("/auth", {
        email,
        password,
      })
      .then((res) => {
        setCredentials(res.data.accessToken);
        router.push("/");
      })
      .catch(handleApiError);
  };

  return (
    <Box component={`form`} onSubmit={(e) => handleLogin(e)}>
      <TextField
        label={`Email`}
        variant={`outlined`}
        type={`email`}
        name={`email`}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label={`Password`}
        variant={`outlined`}
        type={`password`}
        name={`password`}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button variant={`contained`} type={`submit`}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
