// Exemplo básico de API route
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get("ticker") || "";
  const TOKEN = process.env.BRAPI_TOKEN;

  const res = await fetch(
    `https://brapi.dev/api/quote/${ticker}?range=1mo&interval=1d&token=${TOKEN}`
  );

  const data = await res.json();
  return NextResponse.json(data);
}
