import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol") || "PETR4";
    const isDetail = searchParams.get("detail");

    const TOKEN = process.env.BRAPI_TOKEN;

    const url = `https://brapi.dev/api/quote/${encodeURIComponent(
      symbol
    )}?range=1mo&interval=1d&token=${TOKEN || ""}`;
    const resp = await fetch(url);

    if (!resp.ok) {
      return NextResponse.json(
        { error: "Error fetching data from brapi", status: resp.status },
        { status: 502 }
      );
    }

    const data = await resp.json();
    const result = data.results?.[0];

    if (!result) {
      return NextResponse.json(
        { error: "No data found for the provided symbol." },
        { status: 404 }
      );
    }

    if (!isDetail) {
      return NextResponse.json(result);
    } else {
      const open = result.regularMarketOpen;
      const close = result.regularMarketPrice;
      let recommendation = "NEUTRAL";
      if (close > open) recommendation = "BUY";
      else if (close < open) recommendation = "SELL";

      return NextResponse.json({
        symbol,
        open,
        close,
        high: result.regularMarketDayHigh,
        low: result.regularMarketDayLow,
        volume: result.regularMarketVolume,
        logoUrl: result.logourl,
        recommendation,
      });
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}
