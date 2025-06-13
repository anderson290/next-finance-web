import {
  Box,
  Card,
  Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FinanceGraph from "../components/ColumnChart";
import GitHubSignInButton from "../components/GithubButton";

export default async function Home() {
  return (
    <main>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        gap={4}
        width="100%"
      >
        <Box
          flex={3}
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            textAlign: "center",
            p: 12,
            backgroundColor: "#1a1a1a",
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

        <Box
          flex={1}
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            textAlign: "center",
            p: 12,
          }}
        >
          <Card variant="outlined" sx={{ padding: 10 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            ></Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <GitHubSignInButton />
            </Box>
          </Card>
        </Box>
      </Box>
    </main>
  );
}
