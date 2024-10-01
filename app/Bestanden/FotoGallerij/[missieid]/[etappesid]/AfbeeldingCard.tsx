import React from "react";
import {
  getBase64,
  GetImageSignedUrl,
} from "../../../../components/ImageHelper";
import Image from "next/image";
import { MissieEtappeBestand } from "@prisma/client";

interface Props {
  data: MissieEtappeBestand;
}
const AfbeeldingCard = async ({ data }: Props) => {
  const blurred = await getBase64(GetImageSignedUrl(data.url, 100, 0, true));

  const url = GetImageSignedUrl(data.url, 250, 0, false);

  console.log(blurred);
  return (
    <Image
      src={url!}
      alt="Card background"
      className="object-cover rounded-xl"
      // sizes="250px"
      sizes="(max-width:768px) 100vw,33vw"
      placeholder="blur"
      blurDataURL={blurred}
      fill
    />
  );
};

export default AfbeeldingCard;
