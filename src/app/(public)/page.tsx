import { Box, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FinanceGraph from "../components/FinanceGraph";
import GitHubSignInButton from "../components/GithubButton";

export default async function Home() {
  return (
    <main>
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          textAlign: "center",
          px: 2,
          mt: 4,
        }}
      >
        <AttachMoneyIcon
          sx={{
            fontSize: 120,
            color: "#4caf50",
            animation: "spin 5s linear infinite",
          }}
        />
        <Typography variant="h4" fontWeight="bold" color="textPrimary">
          Welcome to the Next Finance
        </Typography>
        <Typography variant="body1" color="textSecondary" maxWidth={400}>
          Track your finances simply, quickly, and securely.
        </Typography>
      <GitHubSignInButton />

        <FinanceGraph />

        <style>
          {`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </Box>
    </main>
  );
}
