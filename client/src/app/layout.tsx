import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./font";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

export const metadata: Metadata = {
  title: "Postify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
