import { NextRequest, NextResponse } from "next/server";
import { TOKEN } from "../constants/.token";

export const dynamic = "force-static";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const data = await fetch(
    `https://brapi.dev/api/quote/${slug}?range=1d&token=${TOKEN || ''}`
  );
  const posts = await data.json();

  if (data.status == 200) {
    return NextResponse.json(posts);
  } else {
    console.error(data)
  }
}
