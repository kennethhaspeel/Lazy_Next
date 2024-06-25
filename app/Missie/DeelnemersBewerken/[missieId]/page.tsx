"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import DeelnemersBewerkenForm from "./DeelnemersBewerkenForm";
import AfbeeldingBewerk from "../../../afbeeldingen/editform.jpg";

import Image from "next/image";
import { GetMission } from "@/lib/actions/MissieActions";
import { Suspense } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { User } from "@prisma/client";
import { GetAllUsers } from "@/lib/actions/UserActions";

interface Props {
  params: {
    missieId: string;
  };
}

const DeelnemersBewerken = async ({ params: {missieId} }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }
  const missieData: Promise<MissieModel> = GetMission(Number(missieId));
  const allUsers: Promise<User[]> = GetAllUsers();

  const [missie, users] = await Promise.all([missieData, allUsers]);
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <section className="pt-5 flex">
          <div className="flex-1 p-4 flex flex-col">
            <DeelnemersBewerkenForm
              missieData={missie}
              allUsers={users}
            />
          </div>

          <div className="hidden md:flex md:flex-1 md:max-w-full">
            <Image
              src={AfbeeldingBewerk}
              alt="editformafbeelding"
              className="h-auto max-w-full"
              placeholder="blur"
            />
          </div>
        </section>
      </Suspense>
    </>
  );
};

export default DeelnemersBewerken;
