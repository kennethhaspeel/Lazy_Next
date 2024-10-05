"use client";
import { GetMissieDagen } from "@/app/components/DatumHelper";
import {
  Accordion,
  AccordionItem,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { MissieEtappe } from "@prisma/client";
import { format, fromUnixTime, getDayOfYear, getUnixTime } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import {
  ArrowUpTrayIcon,
  CameraIcon,
  ChevronDownIcon,
  DocumentPlusIcon,
  EyeIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";

interface Props {
  Etaps: string;
  Begindatum: Date;
  Einddatum: Date;
  missieid: number;
  missieDeelnemers: MissieDeelnemerModel[];
  afgesloten: boolean;
}

const ToonEtappes = ({ Etaps, Begindatum, Einddatum, missieid,afgesloten }: Props) => {
  const router = useRouter();
  const [Etappes, setEtappes] = useState<GetEtappeMetAantallen[]>(JSON.parse(Etaps));
  const [totaleKost, setTotaleKost] = useState(0.0);
  const [ladenNieuweEtappe, setLadenNieuweEtappe] = useState(false);
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
      <div className="bg-slate-300 dark:bg-slate-800 p-2 mt-2">
        <h2 className="text-xl ps-2">
          Etappes (Totaalbedrag: {totaleKost.toFixed(2)})
        </h2>
      </div>
      <div className="ps-3 pt-4">
        <Accordion variant="splitted" isDisabled={ladenNieuweEtappe}>
          {MissieDatums?.map((datum, index) => (
            <AccordionItem
              key={`tabel_${datum.toString()}`}
              aria-label="Algemeen"
              title={index === 0 ? "Algemeen" : format(datum, "dd/MM/yyyy")}
              startContent={ !afgesloten &&
                <div
                  className="border-2 border-sky-500 rounded-lg  px-4 py-1"
                  onClick={() => {
                    setLadenNieuweEtappe(true);
                    redirectNieuweEtappe(datum);
                  }}
                >
                  {ladenNieuweEtappe ? (
                    <Spinner size="sm" />
                  ) : (
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
                  )}
                </div>
              }
            >
              <div className="hidden md:grid md:grid-cols-11">
                <div className="md:col-span-5">
                  <div className="bg-default-300 pt-1 pb-1 ps-1 rounded-l-lg grow">
                    Omschrijving
                  </div>
                </div>
                <div className="md:col-span-1 bg-default-300 pt-1 pb-1 ps-1 content-center">
                  Tijdstip
                </div>
                <div className="md:col-span-1 bg-default-300 pt-1 pb-1 ps-1">
                  Kost
                </div>
                <div className="md:col-span-2 bg-default-300 pt-1 pb-1 ps-1">
                  Bewijsstuk
                </div>
                <div className="md:col-span-2 bg-default-300 pt-1 pb-1 ps-1  rounded-r-lg ">
                  Foto&lsquo;s
                </div>
              </div>
              {Etappes.filter(
                (etappe) =>
                  getDayOfYear(fromUnixTime(etappe.startDatum)) ==
                  getDayOfYear(datum)
              ).map((etappe, index) => (
                <div
                  className="md:grid grid-cols-11 hidden pt-2 pb-2  border-b-1"
                  key={`rij_${etappe.id}`}
                >
                  <div className="md:col-span-5 pt-1  content-center">
                    {etappe.titel}
                  </div>
                  <div className="md:col-span-1 pt-1 content-center">
                    {format(fromUnixTime(etappe.startDatum), "HH:mm")}
                  </div>
                  <div className="md:col-span-1 pt-1 content-center">
                    {Number(etappe.kost).toFixed(2)}
                  </div>
                  <div className="md:col-span-2 pt-1 content-center grow">
                    <ButtonGroup variant="flat">
                      <Button>
                        <>
                          {etappe.aantalbewijsstukken === 1 ? (
                            <span>1 stuk</span>
                          ) : (
                            <span>
                              {etappe.aantalbewijsstukken} stukken
                            </span>
                          )}
                        </>
                      </Button>
                      <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                          <Button isIconOnly>
                            <ChevronDownIcon className="size-6" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          disallowEmptySelection
                          aria-label="Bewijsstuk"
                          selectionMode="single"
                          className="max-w-[300px]"
                          disabledKeys={
                            etappe.aantalbewijsstukken === 0
                              ? [`bekijk_${etappe.id}`]
                              : []
                          }
                        >
                          <DropdownItem
                            key={`bekijk_${etappe.id}`}
                            startContent={<EyeIcon className="size-6" />}
                            href="/"
                          >
                            Bekijk
                          </DropdownItem>

                          <DropdownItem
                            key={`foto_${etappe.id}`}
                            startContent={<DocumentPlusIcon className="size-6" />}
                            href={`/Bestanden/UploadBestand/${missieid}/${etappe.id}/true`}
                          >
                            Toevoegen
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </ButtonGroup>
                  </div>
                  <div className="md:col-span-2 pt-1 content-center grow">
                    <ButtonGroup variant="flat">
                      <Button>
                        <>
                          {etappe.aantalbijlages === 1 ? (
                            <span>1 stuk</span>
                          ) : (
                            <span>
                              {etappe.aantalbijlages} stukken
                            </span>
                          )}
                        </>
                      </Button>
                      <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                          <Button isIconOnly>
                            <ChevronDownIcon className="size-6" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          disallowEmptySelection
                          aria-label="Bewijsstuk"
                          selectionMode="single"
                          className="max-w-[300px]"
                          disabledKeys={
                            etappe.aantalbijlages === 0
                              ? [`bekijk_${etappe.id}`]
                              : []
                          }
                        >
                          <DropdownItem
                            key={`bekijk_${etappe.id}`}
                            startContent={<EyeIcon className="size-6" />}
                            href={`/Bestanden/FotoGallerij/${missieid}/${etappe.id}`}
                          >
                            Bekijk
                          </DropdownItem>

                          <DropdownItem
                            key={`foto_${etappe.id}`}
                            startContent={<DocumentPlusIcon className="size-6" />}
                            href={`/Bestanden/UploadBestand/${missieid}/${etappe.id}/false`}
                          >
                            Toevoegen
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </ButtonGroup>
                  </div>
                </div>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default ToonEtappes;
