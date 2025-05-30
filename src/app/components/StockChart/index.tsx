import { Box, Card, IconButton } from "@mui/material";
import { StockChartClient } from "./StockChartClient";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const TOKEN = process.env.BRAPI_TOKEN;

type BrapiResponse = {
  results: {
    historicalDataPrice: {
      date: number;
      close: number;
    }[];
    logourl: string;
  }[];
};

interface StockChartProps {
  ticker: {
    symbol: string;
    name: string;
    logoUrl: string;
  };
}

export const StockChart = async ({ ticker }: StockChartProps) => {
  const res = await fetch(
    `https://brapi.dev/api/quote/${ticker.symbol}?range=1mo&interval=1d&token=${TOKEN}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div>Failed to fetch data</div>;
  }

  const data: BrapiResponse = await res.json();

  const prices = data.results[0]?.historicalDataPrice.map((item) => ({
    date: new Date(item.date * 1000).toISOString(),
    close: item.close,
  }));

  return (
    <Card sx={{ width: "100%", margin: "0 auto", padding: 2 }}>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Box display="flex" alignItems="center" mb={2}>
            <img
              src={data.results[0]?.logourl || ticker.logoUrl}
              alt={`${ticker.symbol} logo`}
              style={{ width: 32, height: 32, marginRight: 8 }}
            />
            <span>{ticker.name}</span>
          </Box>
        </Box>
        <IconButton aria-label="Open">
          <OpenInNewIcon />
        </IconButton>
      </Box>

      {prices ? <StockChartClient ticker={ticker} data={prices} /> : null}
    </Card>
  );
};
