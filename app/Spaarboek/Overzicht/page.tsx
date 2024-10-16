import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { GetTransactiesPerPersoon } from "@/lib/actions/FinancieelActions";
import Uitleg from "./Uitleg";
import { Suspense } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import FinListBox from "./Listbox/FinListbox";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

const Overzicht = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.rollen.indexOf("deelnemer") === -1 || session === null) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }

  const rijen = await GetTransactiesPerPersoon(session?.user.id);
  console.log(rijen);
  return (
    <>
      <div className="w-7xl w-full p-2">
        <div className="text-2xl">
          Spaarboekske&nbsp;
          <Uitleg />
        </div>
        {session?.user.rollen.indexOf("financieel") > -1 && (
          <div className="flex gap-2 mt-3">
            <Button
              as={Link}
              href="/Spaarboek/TransactieToevoegen"
              startContent={<PlusCircleIcon />}
            >
              Nieuw
            </Button>
            <Button
              as={Link}
              href="/Spaarboek/OverzichtRekening"
              startContent={<PlusCircleIcon />}
            >
              Argenta Overzicht
            </Button>
            <Button
              as={Link}
              href="/Spaarboek/OverzichtPerGebruiker"
              startContent={<PlusCircleIcon />}
            >
              Overzicht per gebruiker
            </Button>
          </div>
        )}
        <Suspense fallback={<LoadingSpinner />}>
          <div className="py-2">
            <FinListBox items={JSON.parse(JSON.stringify(rijen))} />
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default Overzicht;
