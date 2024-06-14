import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GetAllMissions } from "@/lib/actions/MissieActions";
import { GetAllUsers } from "@/lib/actions/UserActions";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { Suspense } from "react";
import MissieBlok from "./MissieBlok";
import { User } from "@prisma/client";

const OverzichtMissies = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.rollen.indexOf("deelnemer") === -1) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }
  const missieData: Promise<MissieModel[]> = GetAllMissions()
  const allUsers: Promise<User[]> = GetAllUsers()

  const [missies,users]= await Promise.all([missieData,allUsers])

  return (
    <Suspense fallback={<Loading />}>
      <div className=" pt-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
      {missies?.map((missie) => {
        return (
          <div className="pt-4" key={missie.id}>
          <MissieBlok
            missie={missie}
            naam={session?.user.naam ? session?.user.naam : ""}
            voornaam={session?.user.voornaam ? session?.user.voornaam : ""}
            allUsers={users}
            key={missie.id}
            
          />
          </div>
        );
      })}
      </div>
    </Suspense>
  );
};

export default OverzichtMissies;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
