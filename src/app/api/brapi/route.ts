// Exemplo básico de API route
import { NextResponse } from "next/server";

export async function GET() {

   const TOKEN = process.env.BRAPI_TOKEN;

  const res = await fetch(`https://brapi.dev/api/quote/PETR4?range=1mo&interval=1d&token=${TOKEN}`);

  console.log(res)
  const data = await res.json();
  // Ajuste aqui para retornar só os dados que quer
  return NextResponse.json(data);
}