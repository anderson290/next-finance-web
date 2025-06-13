// import { Box, Card, IconButton } from "@mui/material";
// import { StockChartClient } from "./StockChartClient";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// const TOKEN = process.env.BRAPI_TOKEN;

// type BrapiResponse = {
//   results: {
//     historicalDataPrice: {
//       date: number;
//       close: number;
//     }[];
//     logourl: string;
//   }[];
// };

export interface IStockChartProps {
  ticker: {
    symbol: string;
    name: string;
    logoUrl: string;
  };
}

// export const StockChart = async ({ ticker }: IStockChartProps) => {
//   const res = await fetch(
//     `https://brapi.dev/api/quote/${ticker.symbol}?range=1mo&interval=1d&token=${TOKEN}`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     return <div>Failed to fetch data</div>;
//   }

//   const data: BrapiResponse = await res.json();

//   const prices = data.results[0]?.historicalDataPrice.map((item) => ({
//     date: new Date(item.date * 1000).toISOString(),
//     close: item.close,
//   }));

//   return (
//     <Card sx={{ width: "100%", margin: "0 auto", padding: 2 }}>
//       <Box
//         mb={2}
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         <Box>
//           <Box display="flex" alignItems="center" mb={2}>
//             <img
//               src={data.results[0]?.logourl || ticker.logoUrl}
//               alt={`${ticker.symbol} logo`}
//               style={{ width: 32, height: 32, marginRight: 8 }}
//             />
//             <span>{ticker.name}</span>
//           </Box>
//         </Box>
//         <IconButton
//           aria-label="Open"
//           href={`/dashboard/${ticker.symbol}`}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <OpenInNewIcon />
//         </IconButton>
//       </Box>

//       {prices ? <StockChartClient ticker={ticker} data={prices} /> : null}
//     </Card>
//   );
// };
"use client";

import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { CircularProgress, Box } from "@mui/material";

type BrapiEntry = {
  date: Date;
  close: number;
};

export default function BrapiLineChart({ symbol = "PETR4" }) {
  const [dataset, setDataset] = useState<BrapiEntry[] | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch(`/api/quote?symbol=${symbol}`);
        const json = await res.json();
        const raw = json.results?.[0]?.historicalDataPrice;
        if (!raw) return;

        const formatted = raw.map((item: any) => ({
          date: new Date(item.date), // data como Date
          close: item.close,
        }));

        setDataset(formatted);
      } catch (err) {
        console.error("Erro ao buscar dados da Brapi:", err);
      }
    }
    fetchPrices();
  }, [symbol]);

  if (!dataset) {
    return (
      <Box display="flex" justifyContent="center" sx={{ height: 300, alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <LineChart
        dataset={dataset}
        series={[
          {
            dataKey: "close",
            label: symbol,
            showMark: false, // remove pontos visuais
          },
        ]}
        xAxis={[
          {
            dataKey: "date",
            scaleType: "time",
            valueFormatter: (d: Date) => d.toLocaleDateString(),
          },
        ]}
        yAxis={[{ label: "Preço (R$)" }]}
        margin={{ left: 60, right: 20, top: 20, bottom: 30 }}
        grid={{ vertical: false, horizontal: true }}
        disableLineItemHighlight // remove destaque ao hover
        height={300}
      />
    </Box>
  );
}