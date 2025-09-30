import { Box, Typography } from "@mui/material";
import CandleChart from "../CandleChart";
import { useStocks } from "../../context/StocksContext";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

interface SelectedStocksProps {
  selectedStocks: string[];
  onRemoveStock: (symbol: string) => void;
}

export default function SelectedStocks({
  selectedStocks,
  onRemoveStock,
}: SelectedStocksProps) {
  const { stocks } = useStocks();

  if (selectedStocks.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%" 
        minHeight="300px"
        mt={4}
      >
        <SentimentDissatisfiedIcon color="disabled" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No stocks
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }}
      gap={4}
      width="100%"
    >
      {selectedStocks.map((symbol) => {
        const ticker = stocks.find((t) => t.stock === symbol);

        // Handle undefined ticker
        if (!ticker) {
          return (
            <Box key={symbol} position="relative">
              <Typography color="error">
                Ticker not found for symbol: {symbol}
              </Typography>
              <IconButton
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
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        }

        return (
          <Box key={symbol} position="relative">
            <CandleChart ticker={ticker} />
            <IconButton
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
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
}