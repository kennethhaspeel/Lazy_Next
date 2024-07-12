import { fromUnixTime } from "date-fns";
import AfbeeldingNieuweEtappe from "../../../../afbeeldingen/NieuweEtappe.jpg";
import Image from "next/image";
import { GetMissieDeelnemers } from "@/lib/actions/UserActions";
import EtappeNieuwForm from "../../EtappeNieuwForm";

const EtappenNieuw = async ({
  params,
}: {
  params: { missieid: string; datum: string };
}) => {
  const missieDeelnemers = await GetMissieDeelnemers(Number(params.missieid));
  console.log(missieDeelnemers);
  return (
    <>
      <section className="pt-5">
        <p className="text-3xl pb-4 text-center">Nieuwe Etappe</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <EtappeNieuwForm
            deelnemers={missieDeelnemers}
            missieid={Number(params.missieid)}
            datum={fromUnixTime(Number(params.datum))}
          />
          <div className="hidden md:block p-3">
            <Image
              src={AfbeeldingNieuweEtappe}
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

export default EtappenNieuw;
