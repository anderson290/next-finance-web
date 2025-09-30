// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const symbol = searchParams.get("symbol") || "PETR4";
//     const isDetail = searchParams.get("detail");

//     const queryOptions = { period: "1mo", interval: "1d" };
//     const data = await yfinance.historical(symbol, queryOptions);

//     if (!data || data.length === 0) {
//       return NextResponse.json(
//         { error: "No data found for the provided symbol." },
//         { status: 404 }
//       );
//     }

//     const result = {
//       historicalDataPrice: data.map((item: any) => ({
//         date: item.date,
//         open: item.open,
//         high: item.high,
//         low: item.low,
//         close: item.close,
//       })),
//       dividendYield: data[0]?.dividendYield || 0,
//       logourl: `https://logo.clearbit.com/${symbol}.com`,
//     };

//     if (!isDetail) {
//       return NextResponse.json(result);
//     } else {
//       const open = result.historicalDataPrice[0]?.open;
//       const close = result.historicalDataPrice[0]?.close;
//       let recommendation = "NEUTRAL";
//       if (close > open) recommendation = "BUY";
//       else if (close < open) recommendation = "SELL";

//       return NextResponse.json({
//         symbol,
//         open,
//         close,
//         high: result.historicalDataPrice[0]?.high,
//         low: result.historicalDataPrice[0]?.low,
//         volume: data[0]?.volume,
//         logoUrl: result.logourl,
//         recommendation,
//       });
//     }
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Internal server error", details: String(err) },
//       { status: 500 }
//     );
//   }
// }
