"use client";

import { createTheme } from "@mui/material";
import { poppins } from "./font";

const theme = createTheme({
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
});

export default theme;
