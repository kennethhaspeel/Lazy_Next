
import { User } from "next-auth";
import CameraInput from "@/app/components/CameraInput";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
interface Props {
    missieid: number;
    etappeid: number;
    currentUser: User;
    isMissieAfbeelding: boolean;
  }
const NeemFoto = async ({missieid,etappeid,currentUser,isMissieAfbeelding}:Props) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }
  return (
    <>
    <CameraInput missieid={missieid} etappeid={etappeid} currentUser={currentUser} isMissieAfbeelding={isMissieAfbeelding}/>
    </>
  )
}

export default NeemFoto