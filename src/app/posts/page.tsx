import { NextResponse } from "next/server";

interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Response {
  posts: PostProps[];
}

// server component
export default async function Posts() {
  const response = await fetch("http://localhost:3000/api/finance/TAEE11");
  return (
    <></>
  );
}
