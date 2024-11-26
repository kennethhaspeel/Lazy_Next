import React from "react";
import {
  getBase64,
  GetImageSignedUrl,
  GetMetaData,
} from "../../../../../components/ImageHelper";
import Image from "next/image";
import { MissieEtappeBestand, User } from "@prisma/client";
import { Card, CardFooter, CardHeader } from "@nextui-org/react";
import {
  DateToDDMMYYYY,
  ExifDatumNaarDatum,
  ExifDatumNaarString,
} from "@/app/components/DatumHelper";
import { fromUnixTime, getUnixTime } from "date-fns";
import { UpdateBestandOpname } from "@/app/components/BewaarBestandDB";

interface Props {
  data: MissieEtappeBestand;
  user: User;
}
const AfbeeldingCard = async ({ data, user }: Props) => {
  const blurred = await getBase64(GetImageSignedUrl(data.url, 100, 0, true));

  const url = GetImageSignedUrl(data.url, 720, 0, false);

 // const metagegevens = await GetMetaData(data.fileId);
  //(metagegevens.exif.exif.CreateDate && data.opnameDatum === 0) && UpdateBestandOpname(data.id,getUnixTime(ExifDatumNaarDatum(metagegevens.exif.exif.CreateDate)))
  //console.log(fromUnixTime(data.opnameDatum).toString())
  return (
    <Card className="max-w-[250px] max-h-[400px] overflow-hidden">
      <CardHeader className="flex gap-3 min-h-[300px]">
        <Image
          // onLoad={onImageLoad}
          src={url!}
          alt="Card background"
          className="rounded-xl max-h-[300px]"
          sizes="(max-width: 640px) 100vw,
       (max-width: 1280px) 50vw,
       (max-width: 1536px) 33vw,
       25vw"
          width={250}
          height={250}
          placeholder="blur"
          blurDataURL={blurred}
          loading="lazy"
        />
      </CardHeader>
      <CardFooter>
        <div className="flex flex-col">
          <div className="text-tiny text-white/80">
            Opgeladen: {user.voornaam} {user.naam}
          </div>
          <div className="text-tiny text-white/80">
            Genomen: {DateToDDMMYYYY(fromUnixTime(data.opnameDatum),true)}
          </div>
        </div>
      </CardFooter>
    </Card>

    // <Image
    //   src={url!}
    //   alt="Card background"
    //   className="object-cover rounded-xl"
    //   sizes="(max-width: 640px) 100vw,
    //   (max-width: 1280px) 50vw,
    //   (max-width: 1536px) 33vw,
    //   25vw"
    //   width={720}
    //   height={480}
    //   placeholder="blur"
    //   blurDataURL={blurred}
    // />
  );
};

export default AfbeeldingCard;
