import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { DateToDDMMYYYY } from "@/app/components/DatumHelper";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { User } from "@prisma/client";
import MissieBlokRemoteAfbeelding from "./MissieBlokRemoteAfbeelding";
import MissieBlokNoImage from "./MissieBlokNoImage";

interface Props {
  missie: MissieModel;
  naam: string;
  voornaam: string;
  allUsers: User[];
}
const MissieBlok = async ({ missie, naam, voornaam, allUsers }: Props) => {
  const deelnemer = missie.deelnemers.filter((el) => {
    return `${el.naam}` === `${voornaam} ${naam}`;
  })[0];
  const detailurl = `/Missies/MissieDetail/${missie.id}`;

  const CheckDeelname = () => {
    const deelnemers = missie.deelnemers;
    let ind = deelnemers.findIndex((deelnemer) => {
      return deelnemer.naam === `${voornaam} ${naam}`;
    });
    return ind > -1;
  };

  return (
    <>
      <Card className="py-4 px-2 border w-[280px] items-center" key={missie.id}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <h4 className="font-bold text-large uppercase">{missie.titel}</h4>
          <p className="text-tiny font-bold">{missie.locatie}</p>

          <small className="text-default-500">
            {DateToDDMMYYYY(missie.startDatum)}
          </small>
        </CardHeader>
        <CardBody className="w-[250px] h-[250px] rounded-2xl overflow-hidden p-2">
          {missie.afbeelding ? (
            <MissieBlokRemoteAfbeelding imageUrl={missie.afbeelding} />
          ) : (
            <div className="pt-2 mt-2">
              <MissieBlokNoImage />
            </div>
          )}
        </CardBody>
        <CardFooter>
          <div className="grid grid-rows-2 w-full">
            <div className="grid grid-cols-2 items-center pb-2">
              <div>Deelnemer? :</div>
              <div className="px-2">
                {CheckDeelname() ? (
                  <HandThumbUpIcon className="h-6" />
                ) : (
                  <HandThumbDownIcon />
                )}
              </div>
            </div>
            <hr />
            {missie.publiekZichtbaar || deelnemer?.isOrganisator ? (
              <div className="columns-1">
                <Button as={Link} href={detailurl} className="w-full">
                  Details
                </Button>
              </div>
            ) : (
              <div className="columns-1">
                <Button
                  as={Link}
                  href={detailurl}
                  className="w-full"
                  isDisabled
                >
                  Nog Geen Details
                </Button>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default MissieBlok;
