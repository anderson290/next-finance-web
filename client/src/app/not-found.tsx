import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center a">
      <h1 className="mt-9">Not Found Page</h1>
      <Link href={"/"}>Home</Link>
    </div>
  );
}
