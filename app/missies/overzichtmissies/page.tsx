import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GetAllMissions } from "@/lib/queries/missieQuery";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { Suspense } from "react";
import MissieBlok from "./MissieBlok";

const OverzichtMissies = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.rollen.indexOf("deelnemer") === -1) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }
  const missies = await GetAllMissions();
  console.log(missies);

  return (
    <Suspense fallback={<Loading />}>
      {missies?.map((missie) => {
        return (
          <MissieBlok
            missie={missie}
            naam={session?.user.naam ? session?.user.naam : ""}
            voornaam={session?.user.voornaam ? session?.user.voornaam : ""}
            key={missie.id}
          />
        );
      })}
    </Suspense>
  );
};

export default OverzichtMissies;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
