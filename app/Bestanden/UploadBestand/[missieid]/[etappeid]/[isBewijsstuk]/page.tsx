import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import Image from "next/image";
import AfbeeldingNeemFoto from "../../../../../afbeeldingen/TakePicture.jpg";
import Upload from "./upload";

interface Props {
  params: {
    missieid: number;
    etappeid: number;
    isBewijsstuk: boolean;
  };
}

const UploadBestand = async ({
  params: { missieid, etappeid, isBewijsstuk },
}: Props) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }
  console.error(`Start UploadBestand: ${isBewijsstuk}`)
  return (
    <>
      <section className="pt-5">
        <p className="text-3xl pb-4 text-center">Bestand Toevoegen</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-3">
            <Upload
              missieid={missieid}
              etappeid={etappeid}
              currentUser={session?.user.id}
              naam={session?.user.naam}
              voornaam={session?.user.voornaam}
              isBewijsstuk={isBewijsstuk}
            />
          </div>
          <div className="hidden md:block p-3">
            {/* <Image
              src={AfbeeldingNeemFoto}
              alt="editformafbeelding"
              className="h-auto max-w-50"
              placeholder="blur"
            /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default UploadBestand;
