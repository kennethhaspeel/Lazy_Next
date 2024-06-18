"use server"
import FormMissieNieuw from "./FormMissieNieuw";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import FormMissieBewerk from "./FormMissieBewerk";
import Afbeelding from "../../../afbeeldingen/editform.jpg";
import Image from "next/image";
import { GetMission } from "@/lib/actions/MissieActions";
import { Suspense } from "react";
interface Props {
  params: {
    missieId: string;
  };
}

const MissieDetailBewerken = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }
  return (
    <Suspense fallback={<Loading />}>
      <section className="pt-5 flex">
        <div className="flex-1 p-4 flex flex-col  items-center">
          <div className="w-full"></div>
          {Number(params.missieId) == 0 ? (
            <FormMissieNieuw userid={session!.user.id} />
          ) : (
            <FormMissieBewerk missieData={await GetMission(Number(params.missieId))} />
          )}
        </div>

        <div className="hidden md:flex md:flex-1 md:max-w-full">
          <Image
            src={Afbeelding}
            alt="editformafbeelding"
            className="h-auto max-w-full"
            placeholder="blur"
          />
        </div>
      </section>
    </Suspense>
  );
};

export default MissieDetailBewerken;
function Loading() {
  return <h2>🌀 Loading...</h2>;
}
