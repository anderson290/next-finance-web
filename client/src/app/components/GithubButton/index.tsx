"use client";

import { signIn } from "next-auth/react";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function GitHubSignInButton() {
  return (
    <Button
      variant="contained"
      startIcon={<GitHubIcon />}
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      sx={{
        backgroundColor: "#24292e",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#333",
        },
        textTransform: "none",
        borderRadius: 2,
        paddingX: 2,
        paddingY: 1,
      }}
    >
      Sign in with GitHub
    </Button>
  );
}