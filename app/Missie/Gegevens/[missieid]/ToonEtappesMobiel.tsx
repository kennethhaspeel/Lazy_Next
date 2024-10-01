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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
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
  EyeIcon,
} from "@heroicons/react/16/solid";

interface Props {
  Etaps: string;
  Begindatum: Date;
  Einddatum: Date;
  missieid: number;
  missieDeelnemers: MissieDeelnemerModel[];
  afgesloten: boolean;
}

const ToonEtappesMobiel = ({
  Etaps,
  Begindatum,
  Einddatum,
  missieid,
  afgesloten,
}: Props) => {
  const router = useRouter();
  const [Etappes, setEtappes] = useState<GetEtappeMetAantallen[]>(
    JSON.parse(Etaps)
  );
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

  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-800 p-1 mt-2">
        <h2 className="text-xl ps-2">
          Etappes (Totaalbedrag: {totaleKost.toFixed(2)})
        </h2>
      </div>
      <div className="ps-1 pt-4">
        <Accordion
          variant="splitted"
          isCompact
          isDisabled={ladenNieuweEtappe}
        //   defaultExpandedKeys={["accordionitem_0"]}
        >
          {MissieDatums?.map((datum, index) => (
            <AccordionItem
              key={`accordionitem_${index}`}
              aria-label="Algemeen"
              title={index === 0 ? "Algemeen" : format(datum, "dd/MM/yyyy")}
              startContent={
                !afgesloten && (
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
                )
              }
            >
              {Etappes.filter(
                (etappe) =>
                  getDayOfYear(fromUnixTime(etappe.startDatum)) ==
                  getDayOfYear(datum)
              ).map((etappe, index) => (
                <div key={`blok_${etappe.id}`}>
                  <div
                    className="bg-slate-600 rounded-small p-2 mt-2"
                    key={`blok_${etappe.id}`}
                  >
                    <div className="grid grid-cols-8">
                      <div className="col-span-8 text-lg font-bold ps-2 rounded-small bg-slate-800">
                        {etappe.titel}
                      </div>
                    </div>
                    <div className="grid grid-cols-8 ps-2 pt-2">
                      <div className="font-bold col-span-3">Tijdstip</div>
                      <div className="col-span-3 justify-self-end">
                        {format(fromUnixTime(etappe.startDatum), "HH:mm")}
                      </div>
                    </div>
                    <div className="grid grid-cols-8 ps-2 pt-2">
                      <div className="font-bold col-span-3">Kost</div>
                      <div className="col-span-3 justify-self-end">
                        &euro; {Number(etappe.kost).toFixed(2)}
                      </div>
                    </div>
                    <div className="grid grid-cols-8 ps-2 pt-2 items-center">
                      <div className="font-bold col-span-3">Bewijs</div>
                      <div className="col-span-5">
                        <ButtonGroup variant="flat">
                          <Button>
                            <>{etappe.aantalbewijsstukken}</>
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
                                startContent={<CameraIcon className="size-6" />}
                                href={`/Bestanden/FotoInput/${missieid}/${etappe.id}/${true}`}
                              >
                                Neem Foto
                              </DropdownItem>
                              <DropdownItem
                                key={`bestand_${etappe.id}`}
                                startContent={
                                  <ArrowUpTrayIcon className="size-6" />
                                }
                                href="/"
                              >
                                Bestand Opladen
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </ButtonGroup>
                      </div>
                    </div>
                    <div className="grid grid-cols-8 ps-2 pt-2  items-center">
                      <div className="font-bold col-span-3">Foto&apos;s</div>
                      <div className="col-span-5 place-items-end">
                        <ButtonGroup variant="flat">
                          <Button>{etappe.aantalbijlages}</Button>
                          <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                              <Button isIconOnly>
                                <ChevronDownIcon className="size-6" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              disallowEmptySelection
                              aria-label="fotos"
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
                                href="/"
                              >
                                Bekijk
                              </DropdownItem>

                              <DropdownItem
                                key={`foto_${etappe.id}`}
                                startContent={<CameraIcon className="size-6" />}
                                href={`/Bestanden/FotoInput/${missieid}/${etappe.id}/${false}`}
                              >
                                Neem Foto
                              </DropdownItem>
                              <DropdownItem
                                key={`bestand_${etappe.id}`}
                                startContent={
                                  <ArrowUpTrayIcon className="size-6" />
                                }
                                href="/"
                              >
                                Bestand Opladen
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </ButtonGroup>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <>
                {Etappes.filter(
                  (etappe) =>
                    getDayOfYear(fromUnixTime(etappe.startDatum)) ==
                    getDayOfYear(datum)
                ).length === 0 && (
                  <div className="grid grid-cols-1 p-2">
                    <div className=" justify-self-center">
                      geen gegevens
                    </div>
                  </div>
                )}
              </>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default ToonEtappesMobiel;
