import { MissieEtappeBestand, User } from "@prisma/client";
import React from "react";
import {
  getBase64,
  GetImageSignedUrl,
  GetMetaData,
} from "../../../../../components/ImageHelper";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: MissieEtappeBestand;
  user: User;
}
const AfbContainer = async ({ data, user }: Props) => {
  const blurred = await getBase64(GetImageSignedUrl(data.url, 100, 0, true));
  const url = GetImageSignedUrl(data.url, 720, 0, false);
  const widthHeightRation = data.height / data.width;
  const galleryHeight = Math.ceil(250 * widthHeightRation);
  const photoSpans = Math.ceil(galleryHeight / 10) + 1;
  return (
    <div
      className="w-[250px] justify-self-center"
      style={{ gridRow: `span ${photoSpans}` }}
    >
      <Link href={GetImageSignedUrl(data.url, 0, 0, false,true)} target="_blank" className="grid place-content-center">
        <div className="rounded-xl bg-stone-300 overflow-hidden group ">
          <Image
            src={url!}
            alt="Card background"
            width={data.width}
            height={data.height}
            className="group-hover:opacity-75 p-1 rounded-xl"
            placeholder="blur"
            blurDataURL={blurred}
            sizes="250px"
          />
        </div>
      </Link>
    </div>
  );
};

export default AfbContainer;
