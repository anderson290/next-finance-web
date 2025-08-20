import { Avatar, Box, Typography, Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { GithubUser } from "@/app/utils/types/finance.type";
import { TICKERS } from "@/app/utils/constants/tickers.constant";
import TickerContainer from "./TickerContainer";

async function getGithubUser(username: string): Promise<GithubUser | null> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata() {
  const user = await getGithubUser("anderson290");
  return {
    title: `Finance Page | ${user?.name ?? "Next Finance"}`,
    description: user?.bio ?? "Finance page with GitHub data and quotes.",
  };
}

export default async function Page({ params }: { params: { stock: string } }) {
  const { stock } = params;

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/brapi?symbol=${encodeURIComponent(stock)}&detail=true`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <div>Error! Could not find that stock!</div>;
  }

  const apiData = await res.json();

  const user: GithubUser | null = await getGithubUser("anderson290");
  const hasTicker = TICKERS.find(
    (t) => t.symbol.trim().toUpperCase() === stock
  );
  if (!hasTicker) {
    return <Box>Stock not found</Box>;
  }

  const ticker = {
    symbol: hasTicker.symbol,
    name: hasTicker.name,
    logoUrl: apiData.logoUrl || apiData.logourl || hasTicker.logoUrl,
    open: apiData.open,
    close: apiData.close,
    high: apiData.high,
    low: apiData.low,
    volume: apiData.volume,
    recommendation: apiData.recommendation,
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
        <Avatar
          src={user?.avatar_url}
          alt={user?.name || "User"}
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        {user && (
          <>
            <Typography variant="h6" fontWeight={600}>
              {user.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ maxWidth: 300, mb: 2 }}
            >
              {user.bio}
            </Typography>
          </>
        )}
      </Box>

      <TickerContainer ticker={ticker} />
    </Box>
  );
}