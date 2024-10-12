import { GetMissieKosten } from "@/lib/actions/MissieActions";
import KostenTabel from "./KostenTabel";
import Image from "next/image";
import { Suspense } from "react";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import afrekening from "../../../../afbeeldingen/afrekening.jpg"
interface Props {
  params: {
    missieid: string;
    missienaam: string;
  };
}

const Afsluiten = async ({ params: { missieid ,missienaam} }: Props) => {
  const kosten = await GetMissieKosten(Number(missieid));
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <section className="pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-5xl pb-4 text-center">Kostenverdeling</p>
              <KostenTabel kosten={kosten} missieid={Number(missieid)} missienaam={missienaam}/>
            </div>
            <div className="hidden md:block">
              <Image
                src={afrekening}
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

export default Afsluiten;
