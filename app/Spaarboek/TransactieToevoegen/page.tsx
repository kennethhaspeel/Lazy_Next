import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { Suspense } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import TransactieForm from "./TransactieForm";
import { GetAllUsers } from "@/lib/actions/UserActions";

const Toevoegen = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.rollen.indexOf("financieel") === -1 || session === null) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }
  const users = await GetAllUsers();
  return (
    <>

        <TransactieForm users={users} />

    </>
  );
};

export default Toevoegen;
