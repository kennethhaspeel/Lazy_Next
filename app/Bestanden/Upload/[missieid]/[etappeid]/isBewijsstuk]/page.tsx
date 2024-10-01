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
  return (
    <>
      <div className="text-2xl">Opladen</div>
      <Upload
        missieid={missieid}
        etappeid={etappeid}
        currentUser={session?.user.id}
        naam={session?.user.naam}
        voornaam={session?.user.voornaam}
        isBewijsstuk={isBewijsstuk}
      />
    </>
  );
};

export default UploadBestand;
