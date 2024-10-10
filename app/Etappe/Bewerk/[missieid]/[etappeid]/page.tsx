import { GetEtappeDetails } from "@/lib/actions/EtappeActions";
import { GetMissieDeelnemers } from "@/lib/actions/UserActions";
import { Button, Link } from "@nextui-org/react";
import { KostVerdeling, MissieEtappe } from "@prisma/client";
import React, { Suspense } from "react";
import BewerkEtappeForm from "./BewerkEtappeForm";
import Image from "next/image";
import BewerkEtappeImage from "../../../../afbeeldingen/BewerkEtappe.jpg";
import LoadingSpinner from "@/app/components/LoadingSpinner";

interface Props {
  params: {
    missieid: number;
    etappeid: number;
  };
}
const BewerkEtappe = async ({ params: { missieid, etappeid } }: Props) => {
  console.log(etappeid);
  const allDeelnemers: Promise<MissieDeelnemerModel[]> = GetMissieDeelnemers(
    Number(missieid)
  );
  const EtappeDetails: Promise<EtappeDetail> = GetEtappeDetails(
    Number(etappeid)
  );
  const [deelnemers, details] = await Promise.all([
    allDeelnemers,
    EtappeDetails,
  ]);
  return (
    <>
      <section className="pt-5">
        <p className="text-3xl pb-4">
          Bewerk &quot;{(await EtappeDetails).titel}&quot;
          <Button as={Link} href={`/Missie/Gegevens/${missieid}`}>
            Terug naar missie
          </Button>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <Suspense fallback={<LoadingSpinner />}>
            <BewerkEtappeForm deelnemers={deelnemers} details={details} />
          </Suspense>

          <div className="hidden md:block p-3">
            <Image
              src={BewerkEtappeImage}
              alt="editformafbeelding"
              className="h-auto max-w-50"
              placeholder="blur"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BewerkEtappe;
