import { Avatar, Box, Typography, Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { GithubUser } from "../../../utils/types/finance.type";
import { useStocks } from "../../../context/StocksContext"; // Import the global StocksContext

async function getGithubUser(username: string): Promise<GithubUser | null> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) return null;
  return res.json();
}
const user = await getGithubUser("anderson290");

export async function generateMetadata() {
  return {
    title: `Finance Page | ${user?.name ?? "Next Finance"}`,
    description: user?.bio ?? "Finance page with GitHub data and quotes.",
  };
}

interface PageProps {
  params: {
    stock: string;
  };
}

export default function Page() {

  const stock = "AAPL"; 
  const { stocks, loading, error } = useStocks();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading stocks: {error}</div>;
  }

  const hasTicker = stocks.find(
    (t) => t.stock.trim().toUpperCase() === stock
  );

  if (!hasTicker) {
    return <Box>Stock not found</Box>;
  }

  // Mocked data for now
  const ticker = {
    symbol: hasTicker.stock,
    name: hasTicker.name,
    logoUrl: "https://via.placeholder.com/100",
    open: 100,
    close: 110,
    high: 115,
    low: 95,
    volume: 1000000,
    recommendation: "Buy",
  };

  return (
    <Box>
      <Box mt={2} mb={2}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <Link underline="hover" color="inherit" href="/">
            <Box display="flex" alignItems="center">
              <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">Home</Typography>
            </Box>
          </Link>
          <Link underline="hover" color="inherit" href="/dashboard">
            <Typography variant="body2">Dashboard</Typography>
          </Link>
          <Typography color="text.primary" variant="body2">
            {ticker.symbol}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={6}
        mb={2}
      >
        <Typography variant="h6" fontWeight={600}>
          Stock: {ticker.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Recommendation: {ticker.recommendation}
        </Typography>
      </Box>
    </Box>
  );
}