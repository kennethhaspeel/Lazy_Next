"use client";
import { GetMissieDagen } from "@/app/components/DatumHelper";
import {
  Accordion,
  AccordionItem,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { MissieEtappe } from "@prisma/client";
import { format, fromUnixTime, getDayOfYear, getUnixTime } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  Etaps: string;
  Begindatum: Date;
  Einddatum: Date;
  missieid: number;
  missieDeelnemers: MissieDeelnemerModel[];
}

const ToonEtappes = ({ Etaps, Begindatum, Einddatum, missieid }: Props) => {
  const router = useRouter();
  //const Etappes: MissieEtappe[] = JSON.parse(Etaps);

  const [Etappes, setEtappes] = useState<MissieEtappe[]>(JSON.parse(Etaps));
  const [totaleKost, setTotaleKost] = useState(0.0);

  useEffect(() => {
    let totaal = 0.0;
    Etappes.forEach((etap) => {
      totaal += Number(etap.kost);
    });
    setTotaleKost(totaal);
  }, [Etappes]);

  const MissieDatums: Date[] = GetMissieDagen(
    Begindatum.toString(),
    Einddatum.toString()
  );

  const redirectNieuweEtappe = (datum: Date) => {
    router.push(`/Missie/EtappeNieuw/${missieid}/${getUnixTime(datum)}`);
  };
  // console.log(`Standaard begin: ${Begindatum}`);
  // console.log(`Standaard eind: ${Einddatum}`);

  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-800 p-2 mt-2">
        <h2 className="text-xl ps-2">
          Etappes (Totaalbedrag: {totaleKost.toFixed(2)})
        </h2>
      </div>
      <div className="ps-3 pt-4">
        <Accordion variant="splitted">
          {MissieDatums?.map((datum, index) =>
            index === 0 ? (
              <AccordionItem
                key={`tabel_${datum.toString()}`}
                aria-label="Algemeen"
                title="Algemeen"
                startContent={
                  <div
                    onClick={() => {
                      redirectNieuweEtappe(datum);
                    }}
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
                  </div>
                }
              >
                <div className="hidden md:grid md:grid-cols-11">
                  <div className="md:col-span-5">
                    <div className="bg-default-300 pt-1 pb-1 ps-1 rounded-l-lg grow">
                      Omschrijving
                    </div>
                  </div>
                  <div className="md:col-span-2 bg-default-300 pt-1 pb-1 ps-1 content-center">
                    Tijdstip
                  </div>
                  <div className="md:col-span-2 bg-default-300 pt-1 pb-1 ps-1">
                    Kost
                  </div>
                  <div className="md:col-span-2 bg-default-300 pt-1 pb-1 ps-1  rounded-r-lg ">
                    &nbsp;
                  </div>
                </div>
                {Etappes.filter(
                  (etappe) =>
                    getDayOfYear(fromUnixTime(etappe.startDatum)) ==
                    getDayOfYear(datum)
                ).map((etappe) => (
                  <div
                    className="md:grid grid-cols-11 hidden pt-2 pb-2  border-b-1"
                    key={`tabel_${datum.toString()}`}
                  >
                    <div className="md:col-span-5 pt-1  content-center">
                      {etappe.omschrijving}
                    </div>
                    <div className="md:col-span-2 pt-1 content-center">
                      {format(fromUnixTime(etappe.startDatum), "HH:mm")}
                    </div>
                    <div className="md:col-span-2 pt-1 content-center">
                      {Number(etappe.kost).toFixed(2)}
                    </div>
                    <div className="md:col-span-2 pt-1 content-center grow">
                      <Button variant="shadow" className="grow">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </AccordionItem>
            ) : (
              <AccordionItem
                key={index}
                aria-label={format(datum, "dd/MM/yyyy")}
                title={format(datum, "dd/MM/yyyy")}
                startContent={
                  <div
                    onClick={() => {
                      redirectNieuweEtappe(datum);
                    }}
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
                  </div>
                }
              >
               <div className="hidden md:grid md:grid-cols-11">
                  <div className="md:col-span-5">
                    <div className="bg-default-300 pt-1 pb-1 ps-1 rounded-l-lg grow">
                      Omschrijving
                    </div>
                  </div>
                  <div className="md:col-span-2 bg-default-300 pt-1 pb-1 ps-1 content-center">
                    Tijdstip
                  </div>
                  <div className="md:col-span-2 bg-default-300 pt-1 pb-1 ps-1">
                    Kost
                  </div>
                  <div className="md:col-span-2 bg-default-300 pt-1 pb-1 ps-1  rounded-r-lg ">
                    &nbsp;
                  </div>
                </div>
                {Etappes.filter(
                  (etappe) =>
                    getDayOfYear(fromUnixTime(etappe.startDatum)) ==
                    getDayOfYear(datum)
                ).map((etappe) => (
                  <div
                    className="md:grid grid-cols-11 hidden pt-2 pb-2  border-b-1"
                    key={`tabel_${datum.toString()}`}
                  >
                    <div className="md:col-span-5 pt-1  content-center">
                      {etappe.omschrijving}
                    </div>
                    <div className="md:col-span-2 pt-1 content-center">
                      {format(fromUnixTime(etappe.startDatum), "HH:mm")}
                    </div>
                    <div className="md:col-span-2 pt-1 content-center">
                      {Number(etappe.kost).toFixed(2)}
                    </div>
                    <div className="md:col-span-2 pt-1 content-center grow">
                      <Button variant="shadow" className="grow">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </AccordionItem>
            )
          )}
        </Accordion>
      </div>
    </>
  );
};

export default ToonEtappes;
