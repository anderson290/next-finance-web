"use client";

import theme from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { StocksProvider } from "../context/StocksContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <StocksProvider>
          <CssBaseline />
          {children}
        </StocksProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
