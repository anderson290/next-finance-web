import { Box, Button, Typography } from "@mui/material";
import CandleChart from "../CandleChart";
import { useStocks } from "@/app/context/StocksContext";

interface SelectedStocksProps {
  selectedStocks: string[];
  onRemoveStock: (symbol: string) => void;
}

export default function SelectedStocks({
  selectedStocks,
  onRemoveStock,
}: SelectedStocksProps) {
   const { stocks } = useStocks();

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }}
      gap={4}
      width="100%"
    >
      {selectedStocks.map((symbol) => {

        console.log(stocks)
        const ticker = stocks.find((t) => t.stock === symbol);

        // Handle undefined ticker
        if (!ticker) {
          return (
            <Box key={symbol} position="relative">
              <Typography color="error">
                Ticker not found for symbol: {symbol}
              </Typography>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => onRemoveStock(symbol)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 10,
                }}
              >
                Remove
              </Button>
            </Box>
          );
        }

        return (
          <Box key={symbol} position="relative">
            <CandleChart ticker={ticker} />
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => onRemoveStock(symbol)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 10,
              }}
            >
              Remove
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}