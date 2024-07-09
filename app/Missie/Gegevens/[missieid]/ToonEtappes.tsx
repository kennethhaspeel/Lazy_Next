"use client";
import { GetMissieDagen } from "@/app/components/DatumHelper";
import { Accordion, AccordionItem, Button, Link } from "@nextui-org/react";
import { MissieEtappe } from "@prisma/client";
import { format, getUnixTime } from "date-fns";
import { useRouter } from "next/navigation";

interface Props {
  Etaps: string;
  Begindatum: Date;
  Einddatum: Date;
  missieid: number;
}

const ToonEtappes = ({ Etaps, Begindatum, Einddatum, missieid }: Props) => {
  const router = useRouter()
  const Etappes: MissieEtappe[] = JSON.parse(Etaps);
  console.log(Etappes);
  const MissieDatums: Date[] = GetMissieDagen(
    Begindatum.toString(),
    Einddatum.toString()
  );

  const redirectNieuweEtappe = (datum:Date)=>{
    router.push(`/Missie/EtappeNieuw?missieid=${missieid}&d=${getUnixTime(datum)}`)
  }
  console.log(`Standaard begin: ${Begindatum}`);
  console.log(`Standaard eind: ${Einddatum}`);

  return (
    <>
      <div className="ps-3 pt-4">
        <Accordion variant="splitted">
          {MissieDatums?.map((datum, index) =>
            index === 0 ? (
              <AccordionItem
                key={index}
                aria-label="Algemeen"
                title="Algemeen"
                startContent={
                  <div onClick={()=>{redirectNieuweEtappe(datum)}}>
                                 <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>       
                  </div>

                }
              >
                Algemeen
              </AccordionItem>
            ) : (
              <AccordionItem
                key={index}
                aria-label={format(datum, "dd/MM/yyyy")}
                title={format(datum, "dd/MM/yyyy")}
                startContent={
                  <Link
                    href={`/Missie/EtappeNieuw?missied=${missieid}&datumString=${format(
                      datum,
                      "yyyy-MM-dd"
                    )}`}
                  >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>

                  </Link>
                }
              >
                {format(datum, "dd/MM/yyyy")}
              </AccordionItem>
            )
          )}
        </Accordion>
      </div>
    </>
  );
};

export default ToonEtappes;
