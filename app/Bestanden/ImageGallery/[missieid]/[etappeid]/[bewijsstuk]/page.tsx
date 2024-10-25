import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../api/auth/[...nextauth]/AuthOptions";
import { MissieEtappeBestand, User } from "@prisma/client";
import { GetAfbeeldingenPerEtappe } from "../../../../../../lib/actions/AfbeeldingActions";
import { Suspense } from "react";
import LoadingSpinner from "../../../../../components/LoadingSpinner";
import { GetAllUsers } from "@/lib/actions/UserActions";
import AfbContainer from "./AfbContainer";
import Link from "next/link";

interface Props {
  params: {
    missieid: number;
    etappeid: number;
    bewijsstuk: boolean;
  };
}
const ToonGallerij = async ({
  params: { missieid, etappeid, bewijsstuk },
}: Props) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }

  const getAfbeeldingen: Promise<MissieEtappeBestand[]> =
    GetAfbeeldingenPerEtappe(etappeid, bewijsstuk);
  const getAllUsers: Promise<User[]> = GetAllUsers();
  const [afbeeldingen, users] = await Promise.all([
    getAfbeeldingen,
    getAllUsers,
  ]);
  return (
    <>
      <div className="bg-slate-800  p-4 mx-2 rounded-xl">
        <Link href={`/Missie/Gegevens/${missieid}`}>Terug naar missie</Link>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <section className=" my-3 grid grid-cols-gallery auto-rows-[10px]">
          {afbeeldingen?.map((afb) => (
            <AfbContainer
              key={afb.id}
              data={afb}
              user={users.find((x) => x.id === afb.userId)!}
            />
          ))}
        </section>
      </Suspense>
    </>
  );
};

export default ToonGallerij;
