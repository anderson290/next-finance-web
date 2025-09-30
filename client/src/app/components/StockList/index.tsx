import { Box, Button, Typography, Card, CardContent } from "@mui/material";
import { useStocks } from "../../context/StocksContext";

interface StockListProps {
  onAddStock: (symbol: string) => void;
}
  const { stocks } = useStocks();

export default function StockList({ onAddStock }: StockListProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
      gap={2}
      mb={4}
    >
      {stocks?.map((ticker) => (
        <Card key={ticker.stock} sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              {ticker.name} ({ticker.stock})
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onAddStock(ticker.stock)}
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