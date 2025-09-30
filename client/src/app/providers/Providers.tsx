"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { StocksProvider } from "../context/StocksContext";
import theme from "../../theme";

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
