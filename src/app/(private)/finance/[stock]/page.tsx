import { Avatar, Box, Chip, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ClientFinance } from "./ClientFinance";
import { redirect } from "next/navigation";
import {
  GithubUser,
  IFinanceQuoteResponse,
} from "@/app/utils/types/finance.type";
import { TICKERS } from "@/app/utils/constants/tickers.constant";

async function getGithubUser(username: string): Promise<GithubUser | null> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 60 * 60 * 24 }, // revalidate every 24 hours
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

async function getPosts(symbol: string): Promise<IFinanceQuoteResponse> {
  const TOKEN = process.env.BRAPI_TOKEN;

  const url = `https://brapi.dev/api/quote/${symbol}?range=1d&token=${
    TOKEN || ""
  }`;
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}
type ITickerProps = {
  ticker: { symbol: string; name: string; logoUrl: string };
};

async function TickerContainer({ ticker }: ITickerProps) {
  const tickerResponse: IFinanceQuoteResponse = await getPosts(ticker.symbol);
  return (
    <div>
      <ClientFinance ticker={tickerResponse} />
    </div>
  );
}

export default async function Page(param: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const { stock } = param;

  const user: GithubUser | null = await getGithubUser("anderson290");
  const ticker = TICKERS.find((t) => t.symbol.trim().toUpperCase() === stock);
  if (!ticker) {
    return <Box>Stock not found</Box>;
  }
  return (
    <Box>
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

      <TickerContainer ticker={ticker} key={stock} />
    </Box>
  );
}
