"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
  missieData: MissieModel;
  allUsers: User[];
}

interface gebruikersmodel {
  id: string;
  naam: string;
  deelnemer: boolean;
  organisator: boolean;
}
const DeelnemersBewerkenForm = ({ missieData, allUsers }: Props) => {
  const [deelnemers, setDeelnemers] = useState<gebruikersmodel[]>([]);


  useEffect(() => {
    let arrDeel:gebruikersmodel[]=[]
    allUsers.map((u) => {
      const user = missieData.deelnemers.filter((deel) => deel.id == `${u.id}`);
      if (user.length >0) {
        let temp: gebruikersmodel = {
          id: u.id,
          naam: user[0].naam,
          deelnemer: true,
          organisator: user[0].isOrganisator,
        };
        arrDeel.push(temp)
      } else {
        let temp: gebruikersmodel = {
          id: u.id,
          naam: `${u.voornaam} ${u.naam}`,
          deelnemer: false,
          organisator: false,
        };
        arrDeel.push(temp)
      }
    });
    setDeelnemers(arrDeel);

  }, [missieData]);

  return (
    <>
      <div className="text-2xl text-bold">Deelnemers Bewerken</div>
      <p className="font-bold">Organisatoren</p>
      {deelnemers?.filter(d=>d.organisator).map((user) => <p key={user.id}>{user.naam}</p>)}
      <p className="font-bold">Deelnemers</p>
      {deelnemers?.filter(d=>!d.organisator && d.deelnemer).map((user) => <p key={user.id}>{user.naam}</p>)}
      <p className="font-bold">Niet Deelnemers</p>
      {deelnemers?.filter(d=>!d.deelnemer).map((user) => <p key={user.id}>{user.naam}</p>)}
    </>
  );
};

export default DeelnemersBewerkenForm;
