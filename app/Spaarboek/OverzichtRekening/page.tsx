import { authOptions } from "@/app/api/auth/[...nextauth]/AuthOptions";
import { DateToDDMMYYYY } from "@/app/components/DatumHelper";
import { GetSpaarboekTransacties } from "@/lib/actions/FinancieelActions";
import db from "@/lib/prisma";
import Tabel from "./tabel";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user.rollen.indexOf("financieel") === -1 || session === null) {
    return <h1 className="text-5xl">Geen Toegang</h1>;
  }

  const data: SpaarboekTransactie[] = await GetSpaarboekTransacties();
  console.log(data);

  return (
    <>
      <Tabel items={data} />
    </>
  );
};

export default page;
