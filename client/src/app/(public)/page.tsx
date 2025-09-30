import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Main } from "./Main";
import { authOptions } from "../../lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return <Main />;
}
