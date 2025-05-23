
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { DateToDDMMYYYY } from "@/app/components/DatumHelper";
import Link from "next/link";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ArrowUpTrayIcon, CameraIcon, ChevronDownIcon, EyeIcon } from "@heroicons/react/16/solid";
import ToonMissieAfbeelding from "./ToonMissieAfbeelding";

interface Props {
  missieData: MissieModel;
  currentUser: MissieDeelnemerModel;
}

const ToonGegevens = async ({ missieData, currentUser }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }

  return (
    <>
      <form className="hidden sm:grid w-full">
        <div className="space-y-12">
          <div className="">
            <div className="mt-3 mb-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Titel</div>
              <div className="sm:col-span-5">{missieData.titel}</div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pe-2">
              <div className="ps-2 font-extrabold">Omschrijving</div>
              <div className="sm:col-span-5">
                <p>{missieData.omschrijving}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Locatie</div>
              <div className="sm:col-span-5">
                <p>{missieData.locatie}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Afbeelding</div>
              <div className="sm:col-span-5">
                {currentUser.isOrganisator ? (
                  <ToonMissieAfbeelding hasImage={missieData.afbeelding != null} missieid={missieData.id}/>
                ) : (
                  <div>
                    {missieData.afbeelding ? (
                      <p>Bekijk afbeelding</p>
                    ) : (
                      <ToonMissieAfbeelding hasImage={missieData.afbeelding != null} missieid={missieData.id}/>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Startdatum</div>
              <div className="sm:col-span-5">
                 <p>{DateToDDMMYYYY(missieData.startDatum)}</p> 
               
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="ps-2 font-extrabold">Einddatum</div>
              <div className="sm:col-span-5">
                <p>{DateToDDMMYYYY(missieData.eindDatum)}</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ToonGegevens;
