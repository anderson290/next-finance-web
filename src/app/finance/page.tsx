import { Box } from "@mui/material";
import { IFinanceQuoteResponse } from "../utils/types/finance.type";
import { ClientFinance } from "./ClientFinance";
import { TICKERS } from "../utils/constants/tickers.constant";

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
type IProps = {
  ticker: { symbol: string; name: string; logoUrl: string };
};

async function TickerContainer({ ticker }: IProps) {
  const tickerResponse: IFinanceQuoteResponse = await getPosts(ticker.symbol);
  return (
    <div>
      <ClientFinance currentQuote={tickerResponse} />
    </div>
  );
};

export default async function FinancePage() {
  return (
    <Box>
      {TICKERS.map(
        (ticker: { symbol: string; name: string; logoUrl: string }) => (
          <TickerContainer ticker={ticker} key={ticker.symbol} />
        )
      )}
    </Box>
  );
}
