import { TICKERS } from "@/app/utils/constants/tickers.constant";
import { authOptions } from "@/lib/auth";
import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CandleChart from "../../components/CandleChart";

export default async function Page() {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/auth/signin");
  // }

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }}
      gap={4}
      width="100%"
    >
      {TICKERS.map((ticker) => (
        <CandleChart key={ticker.symbol} ticker={ticker} />
        // <BrapiLineChart key={ticker.symbol} symbol={ticker.symbol} />
      ))}
    </Box>
  );
}
