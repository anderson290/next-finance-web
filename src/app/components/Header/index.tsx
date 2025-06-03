"use client";

import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header>
      {session ? (
        <button onClick={() => signOut({callbackUrl: '/'})}>Sign out</button>
      ) : (
        <></>
        // <button onClick={() => signIn()}>Sign in</button>
      )}
    </header>
  );
}