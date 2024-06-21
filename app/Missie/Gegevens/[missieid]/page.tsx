import { GetMission } from "@/lib/actions/MissieActions";
import { GetAllUsers } from "@/lib/actions/UserActions";
import { User } from "@prisma/client";

import ToonGegevens from "./ToonGegevens";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";

interface Props {
  params: {
    missieid: string;
  };
}

const page = async ({ params: { missieid } }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }

  const missieData: Promise<MissieModel> = GetMission(Number(missieid));
  const allUsers: Promise<User[]> = GetAllUsers();

  const [missie, users] = await Promise.all([missieData, allUsers]);
  return (
    <>
      <ToonGegevens missieData={missie} />
      <hr />
    </>
  );
};

export default page;
