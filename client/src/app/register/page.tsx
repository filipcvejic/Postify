"use client";

import { postifyApi } from "@/api/postifyApi";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await postifyApi.post("register", {
      username,
      email,
      password,
      confirmedPassword,
    });
  };

  return (
    <Box component={`form`} onSubmit={(e) => handleRegister(e)}>
      <TextField
        label={`Username`}
        variant={`outlined`}
        type={`username`}
        name={`username`}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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
      <TextField
        label={`Confirm password`}
        variant={`outlined`}
        type={`password`}
        name={`confirmed-password`}
        onChange={(e) => setConfirmedPassword(e.target.value)}
        required
      />
      <Button variant={`contained`} type={`submit`}>
        Register
      </Button>
    </Box>
  );
};

export default Register;
