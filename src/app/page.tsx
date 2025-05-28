import { Card } from "@mui/material";
import {StockChart} from "./components/StockChart";

  const TOKEN = process.env.BRAPI_TOKEN;

type BrapiResponse = {
  results: {
    historicalDataPrice: {
      date: number;
      close: number;
    }[];
  }[];
};

export default async function Home() {
  const res = await fetch(
    `https://brapi.dev/api/quote/PETR4?range=1mo&interval=1d&token=${TOKEN}`,
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
    <main>
      <h1>Dashboard Financeiro</h1>
      <Card sx={{width: '100%', maxWidth: 600, margin: '0 auto', padding: 2}}>
        <h2>PETR4</h2>
        {prices ? <StockChart data={prices} title="PETR4 - Last month" /> : null}

      </Card>
    </main>
  );
}
