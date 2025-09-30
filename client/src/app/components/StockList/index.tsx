import { TICKERS } from "@/app/utils/constants/tickers.constant";
import { Box, Button, Typography, Card, CardContent } from "@mui/material";

interface StockListProps {
  onAddStock: (symbol: string) => void;
}

export default function StockList({ onAddStock }: StockListProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
      gap={2}
      mb={4}
    >
      {TICKERS.map((ticker) => (
        <Card key={ticker.symbol} sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              {ticker.name} ({ticker.symbol})
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onAddStock(ticker.symbol)}
              sx={{ mt: 2 }}
            >
              + Add to Dashboard
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}