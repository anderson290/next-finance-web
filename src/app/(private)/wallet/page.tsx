import React from "react";
import WalletCard from "@/app/components/WalletCard";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "#121212",
        minHeight: "100vh",
        padding: 32,
      }}
    >
      <WalletCard
        name="Banco do Brasil"
        value="R$ 12.345,67"
        logo="https://apoio.developers.bb.com.br/assets/img/logo.png"
        color="#FEEA00"
      />
      <WalletCard isEmpty />
    </div>
  );
}
