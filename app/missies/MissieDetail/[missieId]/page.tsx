import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { GetMission } from "@/lib/actions/MissieActions";
import { GetAllUsers } from "@/lib/actions/UserActions";
import { User } from "@prisma/client";
import { Button, Input } from "@nextui-org/react";
import { DateToDDMMYYYY } from "@/app/components/DatumHelper";
import Link from "next/link";

interface Props {
  params: {
    missieId: string;
  };
}

const DetailPagina = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (session?.user.rollen.indexOf("deelnemer") === -1) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }
  const missieData: Promise<MissieModel> = GetMission(Number(params.missieId));
  const allUsers: Promise<User[]> = GetAllUsers();

  const [missie, users] = await Promise.all([missieData, allUsers]);
  const deelnemer = missie.deelnemers.filter((el) => {
    return `${el.naam}` === `${session?.user.voornaam} ${session?.user.naam}`;
  })[0];
  console.log(missie);
  return (
    <div className="pt-4 h-screen max-w-7xl mx-auto">
      <div className="text-3xl">{missie.titel}</div>
      <form className="hidden sm:grid">
        <div className="space-y-12">
          <div className="border">
            <div className="mt-3 mb-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Titel</div>
              <div className="sm:col-span-5">{missie.titel}</div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Omschrijving</div>
              <div className="sm:col-span-5">
                <p>{missie.omschrijving}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Locatie</div>
              <div className="sm:col-span-5">
                <p>{missie.locatie}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Afbeelding</div>
              <div className="sm:col-span-5">
                {deelnemer.isOrganisator ? (
                  <div>
                    {missie.afbeelding ? "afbeelding" : "geen afbeelding"}
                  </div>
                ) : (
                  <div>
                    {missie.afbeelding ? (
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
                <p>{DateToDDMMYYYY(missie.startDatum)}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Einddatum</div>
              <div className="sm:col-span-5">
                <p>{DateToDDMMYYYY(missie.eindDatum)}</p>
              </div>
            </div>
            {!!deelnemer.isOrganisator ? (
              <div className="mt-3 mb-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="ps-2">
                  <Button
                    as={Link}
                    href={`/missies/MissieDetailBewerken/${params.missieId}`}
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

export default DetailPagina;
