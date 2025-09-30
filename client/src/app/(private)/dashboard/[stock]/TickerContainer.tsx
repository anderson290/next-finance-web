import { Card, CardContent, Typography, Box, Chip, Avatar } from "@mui/material";

interface ITickerProps {
  ticker: {
    symbol: string;
    name: string;
    logoUrl: string;
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    recommendation: string;
  };
}

async function TickerContainer({ ticker }: ITickerProps) {
  return (
    <Card sx={{ maxWidth: 600, margin: "32px auto", boxShadow: 4 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            src={ticker.logoUrl}
            alt={ticker.symbol}
            sx={{
              width: 64,
              height: 64,
              marginRight: 2,
              boxShadow: 2,
              bgcolor: "background.paper",
              border: "2px solid #f0f0f0",
            }}
          />
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {ticker.symbol}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {ticker.name}
            </Typography>
          </Box>
          <Box flexGrow={1} />
          <Chip
            label={ticker.recommendation}
            color={
              ticker.recommendation === "COMPRA"
                ? "success"
                : ticker.recommendation === "VENDA"
                ? "error"
                : "default"
            }
            sx={{ fontWeight: 700, fontSize: 16 }}
          />
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr 1fr", sm: "1fr 1fr 1fr" }}
          gap={2}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Open
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              R$ {ticker.open?.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Close
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              R$ {ticker.close?.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Max
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              R$ {ticker.high?.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Min
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              R$ {ticker.low?.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Volume
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {ticker.volume?.toLocaleString("pt-BR")}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TickerContainer;