import { Button, Chip } from "@nextui-org/react";
import { User } from "@prisma/client";
import Link from "next/link";

interface Params {
  deelnemers: MissieDeelnemerModel[];
  currentUser: MissieDeelnemerModel;
  missieId: string;
}

const ToonDeelnemers = ({ deelnemers, currentUser, missieId }: Params) => {
  return (
    <>
      <div className="pt-2 ps-2">
        <div className="font-bold underline text-xl">Organisator(en)</div>
        <div className="p-2 w-full md:max-w-7xl flex overflow-auto gap-4">
          {deelnemers
            .filter((u) => u.isOrganisator)
            .map((u) => {
              return (
                <div key={u.id} className="outline outline-green-500 hover:bg-green-300 hover:text-gray-800 p-2 rounded-lg">
                  {u.naam}
                </div>
              );
            })}
        </div>
      </div>
      <div className="pt-2 ps-2">
        <div className="font-bold  underline text-xl">Deelnemer(s)</div>
        <div className="p-2 w-full md:max-w-7xl flex flex-wrap gap-3">
          {deelnemers
            .filter((u) => !u.isOrganisator)
            .map((u) => {
              return (
                <div key={u.id} className="shrink-0 outline outline-green-500 hover:bg-green-300 hover:text-gray-800 p-2 rounded-lg">
                  {u.naam}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ToonDeelnemers;
