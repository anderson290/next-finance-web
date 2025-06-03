import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { StockChart } from "@/app/components/StockChart";
import { TICKERS } from "@/app/utils/constants/tickers.constant";
import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 2,
        padding: 2,
      }}
    >
      {TICKERS.map((ticker) => (
        <StockChart key={ticker.symbol} ticker={ticker} />
      ))}
    </Box>
  );
}
