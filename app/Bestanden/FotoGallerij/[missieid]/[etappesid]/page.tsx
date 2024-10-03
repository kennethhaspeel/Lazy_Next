import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../api/auth/[...nextauth]/AuthOptions";
import { MissieEtappeBestand, User } from "@prisma/client";
import { GetAfbeeldingenPerEtappe } from "../../../../../lib/actions/AfbeeldingActions";
import { Suspense } from "react";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import AfbeeldingCard from "./AfbeeldingCard";
import { GetAllUsers } from "@/lib/actions/UserActions";

interface Props {
  params: {
    missieid: number;
    etappeid: number;
  };
}

const ToonGallerij = async ({ params: { missieid, etappeid } }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }

  const getAfbeeldingen: Promise<MissieEtappeBestand[]> = GetAfbeeldingenPerEtappe(etappeid)
  const getAllUsers: Promise<User[]> = GetAllUsers();
  const [afbeeldingen,users] = await Promise.all([getAfbeeldingen,getAllUsers])




  return (
    <>
      <div className="font-bold">Overzicht</div>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {afbeeldingen?.map((afb, index) => (
            <AfbeeldingCard key={afb.id} data={afb} user={users.find(x=>x.id === afb.userId)!} />
          ))}
        </div>
      </Suspense>
    </>
  );
};

export default ToonGallerij;
