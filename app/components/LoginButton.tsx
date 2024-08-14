"use client";

import { Button } from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

const LoginButton = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          <Button
            as={Link}
            className="dark:hover:bg-slate-500 dark:hover:text-white p-2 rounded-lg transition-colors"
            href={"/api/auth/signout"}
          >
            Log uit
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => signIn()}>Log in </Button>
          <Button as={Link} href="/identity/registreer">
            Registreer
          </Button>
        </>
      )}
    </div>
  );
};

export default LoginButton;
