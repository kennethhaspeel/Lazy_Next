import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { GetAllMissions } from "@/lib/queries/missieQuery";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { Suspense } from "react";

const OverzichtMissies = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.rollen.indexOf("admin") === -1) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }
  const missies = await GetAllMissions();
  console.log(missies);



  return (

    <Suspense fallback={<Loading/>}>
    {
      missies?.map(missie=>{
        return (
          <p key={missie.id}>{missie.omschrijving} - {missie.locatie}</p>
        )
      })
    }
    </Suspense>

  )
};

export default OverzichtMissies;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}