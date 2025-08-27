import { getInvestimentosBB } from "@/app/services/bancoDoBrasil";
import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.BB_ACCESS_TOKEN!;
  const data = await getInvestimentosBB(token);
  return NextResponse.json(data);
}