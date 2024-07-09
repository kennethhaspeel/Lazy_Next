import { getServerSession } from "next-auth";
import { GetAllMissions } from "@/lib/actions/MissieActions";
import { GetAllUsers } from "@/lib/actions/UserActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { Suspense } from "react";
import MissieBlok from "./MissieBlok";
import { User } from "@prisma/client";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Button, Link } from "@nextui-org/react";

const OverzichtMissies = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.rollen.indexOf("deelnemer") === -1) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }
  const missieData: Promise<MissieModel[]> = GetAllMissions();
  const allUsers: Promise<User[]> = GetAllUsers();

  const [missies, users] = await Promise.all([missieData, allUsers]);

  return (
    <>
      <div className="flex"></div>
      <h1 className="text-4xl font-extrabold grow">
        Overzicht missies{" "}
        <Link href="/Missie/Nieuw">
          <Button
            color="primary"
            variant="shadow"
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            }
          >
            Nieuwe Missie
          </Button>
        </Link>
      </h1>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-5 pt-2">
          {missies?.map((missie) => {
            return (
              <div className="pt-4 mx-auto" key={missie.id}>
                <MissieBlok
                  missie={missie}
                  naam={session?.user.naam ? session?.user.naam : ""}
                  voornaam={
                    session?.user.voornaam ? session?.user.voornaam : ""
                  }
                  allUsers={users}
                  key={missie.id}
                />
              </div>
            );
          })}
        </div>
      </Suspense>
    </>
  );
};

export default OverzichtMissies;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
