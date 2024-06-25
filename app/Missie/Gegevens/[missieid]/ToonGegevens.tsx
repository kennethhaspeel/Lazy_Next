import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { GetMission } from "@/lib/actions/MissieActions";
import { GetAllUsers } from "@/lib/actions/UserActions";
import { User } from "@prisma/client";
import { Button, Input } from "@nextui-org/react";
import { DateToDDMMYYYY } from "@/app/components/DatumHelper";
import Link from "next/link";

interface Props {
  missieData: MissieModel;
  currentUser: MissieDeelnemerModel
}

const ToonGegevens = async ({ missieData, currentUser }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }
  // const deelnemer = missieData.deelnemers.filter((el) => {
  //   return `${el.naam}` === `${session?.user.voornaam} ${session?.user.naam}`;
  // })[0];

  return (
    <div className="pt-4 max-w-7xl mx-auto">
      <div className="text-3xl">Missie '{missieData.titel}'</div>
      <form className="hidden sm:grid">
        <div className="space-y-12">
          <div className="border">
          <div className="grid grid-row-1 pt-2 pb-2 dark:bg-slate-800">
            <p className="text-2xl ps-2">Missie Details</p>
        </div>
            <div className="mt-3 mb-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Titel</div>
              <div className="sm:col-span-5">{missieData.titel}</div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Omschrijving</div>
              <div className="sm:col-span-5">
                <p>{missieData.omschrijving}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Locatie</div>
              <div className="sm:col-span-5">
                <p>{missieData.locatie}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Afbeelding</div>
              <div className="sm:col-span-5">
                {currentUser.isOrganisator ? (
                  <div>
                    {missieData.afbeelding ? "afbeelding" : "geen afbeelding"}
                  </div>
                ) : (
                  <div>
                    {missieData.afbeelding ? (
                      <p>Bekijk afbeelding</p>
                    ) : (
                      "Nog geen afbeelding"
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Startdatum</div>
              <div className="sm:col-span-5">
                <p>{DateToDDMMYYYY(missieData.startDatum)}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Einddatum</div>
              <div className="sm:col-span-5">
                <p>{DateToDDMMYYYY(missieData.eindDatum)}</p>
              </div>
            </div>
            {!!currentUser.isOrganisator ? (
              <div className="mt-3 mb-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="ps-2">
                <Button
                    as={Link}
                    href={`/Missie/GegevensBewerken/${missieData.id}`}
                    className="w-full"
                    color="primary"
                  >
                    Bewerken
                  </Button>
                </div>
                <div className="sm:col-span-5"></div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ToonGegevens;
