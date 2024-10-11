import { GetMission } from "@/lib/actions/MissieActions";
import { GetAllUsers, GetMissieDeelnemers } from "@/lib/actions/UserActions";
import { MissieEtappe, User } from "@prisma/client";

import ToonGegevens from "./ToonGegevens";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import ToonDeelnemers from "./ToonDeelnemers";
import ToonGegevensMobiel from "./ToonGegevensMobiel";
import { Button, Link } from "@nextui-org/react";
import { GetAllEtappesMetBewijsstuk } from "@/lib/actions/MissieEtappeActions";
import ToonEtappes from "./ToonEtappes";
import BevestigAfsluiten from "./BevestigAfsluiten";
import ToonEtappesMobiel from "./ToonEtappesMobiel";

interface Props {
  params: {
    missieid: string;
  };
}

const page = async ({ params: { missieid } }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }

  const missieData: Promise<MissieModel> = GetMission(Number(missieid));
  const allUsers: Promise<User[]> = GetAllUsers();
  const allEtappes: Promise<GetEtappeMetAantallen[]> =
    GetAllEtappesMetBewijsstuk(Number(missieid), "desc");
  const allDeelnemers: Promise<MissieDeelnemerModel[]> = GetMissieDeelnemers(
    Number(missieid)
  );

  const [missie, users, etappes, missieDeelnemers] = await Promise.all([
    missieData,
    allUsers,
    allEtappes,
    allDeelnemers,
  ]);
  const currentUser = missie.deelnemers.filter((el) => {
    return `${el.naam}` === `${session?.user.voornaam} ${session?.user.naam}`;
  })[0];
  return (
    <>
      <div className="pt-4 w-full">
        <div className="text-2xl ps-2">
          Missie &apos;{missie.titel}&apos;
          {!missie.afgesloten && (
            <BevestigAfsluiten
              missieid={Number(missieid)}
              missienaam={missie.titel}
            />
          )}
        </div>
        <div className="bg-slate-300 dark:bg-slate-800 p-2 mt-4">
          <h2 className="text-xl ps-2">Missie Details</h2>
        </div>
        <div className="hidden sm:block w-full ps-2">
          <ToonGegevens missieData={missie} currentUser={currentUser} />
        </div>

        <div className="sm:hidden">
          <ToonGegevensMobiel missieData={missie} currentUser={currentUser} />
        </div>
        {!!currentUser.isOrganisator && !missie.afgesloten && (
          <div className="mt-3 mb-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
            <div className="ps-2">
              <Button
                as={Link}
                href={`/Missie/GegevensBewerken/${missie.id}`}
                className="w-full"
                color="primary"
              >
                Bewerken
              </Button>
            </div>
            <div className="sm:col-span-5"></div>
          </div>
        )}
      </div>

      <div className="bg-slate-300 dark:bg-slate-800 p-2 mt-2">
        <h2 className="text-xl ps-2">Deelnemers</h2>
      </div>
      <ToonDeelnemers
        deelnemers={missie?.deelnemers}
        currentUser={currentUser}
        missieId={missieid}
      />
      {!!currentUser.isOrganisator && !missie.afgesloten && (
        <div className="mt-3 mb-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="ps-2">
            <Button
              as={Link}
              href={`/Missie/DeelnemersBewerken/${missieid}`}
              className="w-full"
              color="primary"
            >
              Bewerken
            </Button>
          </div>
          <div className="sm:col-span-5"></div>
        </div>
      )}

      <div className="sm:hidden">
        <ToonEtappesMobiel
          Etaps={JSON.stringify(etappes, (key, value) =>
            typeof value === "bigint" ? Number(value) : value
          )}
          Begindatum={missie.startDatum}
          Einddatum={missie.eindDatum}
          missieid={Number(missieid)}
          missieDeelnemers={missieDeelnemers}
          afgesloten={missie.afgesloten}
        />
      </div>
      <div className="hidden sm:block w-full ps-2">
        <ToonEtappes
          Etaps={JSON.stringify(etappes, (key, value) =>
            typeof value === "bigint" ? Number(value) : value
          )}
          Begindatum={missie.startDatum}
          Einddatum={missie.eindDatum}
          missieid={Number(missieid)}
          missieDeelnemers={missieDeelnemers}
          afgesloten={missie.afgesloten}
        />
      </div>
    </>
  );
};

export default page;
