import { Box } from "@mui/material";
import { StockChart } from "./components/StockChart";
import { TICKERS } from "./utils/constants/tickers.constant";

export default async function Home() {
  return (
    <main>
      <Box pl={4}>
        <h1>Dashboard</h1>
      </Box>

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
    </main>
  );
}
