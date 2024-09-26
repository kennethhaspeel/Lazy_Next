import React from "react";
import Image from "next/image";
import AfbeeldingNeemFoto from "../../../afbeeldingen/TakePicture.jpg";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";

interface Props {
  params: {
    missieid: string;
  };
}

const MissieAfbeelding = async ({ params: { missieid } }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }
  return (
    <>
      <section className="pt-5">
        <p className="text-3xl pb-4 text-center">Nieuwe Foto</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* <div>
            <CameraInput
              missieid={Number(missieid)}
              etappeid={0}
              isMissieAfbeelding={true}
              currentUser={session?.user}
            />
          </div> */}
          <div className="hidden md:block p-3">
            <Image
              src={AfbeeldingNeemFoto}
              alt="editformafbeelding"
              className="h-auto max-w-50"
              placeholder="blur"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default MissieAfbeelding;
