import FormMissieNieuw from "./FormMissieNieuw";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import AfbeeldingNieuw from "../../afbeeldingen/newmission.jpg";
import Image from "next/image";
import { Suspense } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const MissieNieuw = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <section className="pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-5xl pb-4 text-center">Nieuwe Missie</p>
              <FormMissieNieuw userid={session!.user.id} />
            </div>
            <div className="hidden md:block">
              <Image
                src={AfbeeldingNieuw}
                alt="editformafbeelding"
                className="h-auto max-w-50"
                placeholder="blur"
              />
            </div>
          </div>
        </section>
      </Suspense>
    </>
  );
};

export default MissieNieuw;
