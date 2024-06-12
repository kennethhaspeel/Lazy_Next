import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import {
  GetImageAsDate,
  GetImageSignedUrl,
} from "@/app/components/imagekitHelper";
import { User } from "@prisma/client";

interface Props {
  missie: MissieModel;
  naam: string;
  voornaam: string;
}
const MissieBlok = ({ missie, naam, voornaam }: Props) => {
  const imageUrl = missie.afbeelding || "test";
  console.log(missie.deelnemers);
  const url = GetImageSignedUrl(
    "/IMG_20201128_172104_7oU1_fEKZ.jpg",
    false,
    true
  );

  return (
    <>
      <Card className="py-4" key={missie.id}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{missie.titel}</p>
          <small className="text-default-500">
            {missie.startDatum.toISOString()}
          </small>
          <h4 className="font-bold text-large">{missie.locatie}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={url}
            width={270}
          />
          <div className="pt-3">{naam}</div>
        </CardBody>
      </Card>
    </>
  );
};

export default MissieBlok;
