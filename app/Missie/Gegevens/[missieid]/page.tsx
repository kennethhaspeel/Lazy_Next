import { GetMission } from "@/lib/actions/MissieActions";
import { GetAllUsers } from "@/lib/actions/UserActions";
import { User } from "@prisma/client";

import ToonGegevens from "./ToonGegevens";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import ToonDeelnemers from "./ToonDeelnemers";
import ToonGegevensMobiel from "./ToonGegevensMobiel";
import { Button, Link } from "@nextui-org/react";

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

  const [missie, users] = await Promise.all([missieData, allUsers]);
  const currentUser = missie.deelnemers.filter((el) => {
    return `${el.naam}` === `${session?.user.voornaam} ${session?.user.naam}`;
  })[0];
  return (
    <>
      <div className="pt-4 w-full">
        <div className="text-2xl">Missie &apos;{missie.titel}&apos;</div>
        <div className="bg-slate-100 dark:bg-slate-800 p-2 mt-4">
        <h2 className="text-xl ps-2">Missie Details</h2>
      </div>
        <div className="hidden sm:block w-full">
          <ToonGegevens missieData={missie} currentUser={currentUser} />
        </div>

        <div className="sm:hidden">
          <ToonGegevensMobiel missieData={missie} currentUser={currentUser} />
        </div>
        {!!currentUser.isOrganisator && (
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
      <div className="bg-slate-100 dark:bg-slate-800 p-2 mt-2">
        <h2 className="text-xl ps-2">Deelnemers</h2>
      </div>
      <ToonDeelnemers
        deelnemers={missie?.deelnemers}
        currentUser={currentUser}
        missieId={missieid}
      />
      {!!currentUser.isOrganisator && (
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
            <div className="bg-slate-100 dark:bg-slate-800 p-2 mt-2">
        <h2 className="text-xl ps-2">Etappes</h2>
      </div>
    </>
  );
};

export default page;
