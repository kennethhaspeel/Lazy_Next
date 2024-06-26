import { Button, Chip } from "@nextui-org/react";
import { User } from "@prisma/client";
import Link from "next/link";

interface Params {
  deelnemers: MissieDeelnemerModel[];
  currentUser: MissieDeelnemerModel;
  missieId: string;
}

const ToonDeelnemers = ({
  deelnemers,
  currentUser,
  missieId,
}: Params) => {

  return (
    <>
      <div className="border mt-5">
        <div className="grid grid-row-1 pt-2 pb-2 dark:bg-slate-800">
          <p className="text-2xl ps-2">Deelnemers</p>
        </div>
        <div className="pt-2 ps-2">
          <div className="font-bold  underline text-xl">Organisator(en)</div>
          <div className="p-2  flex gap-4">
            {deelnemers
              .filter((u) => u.isOrganisator)
              .map((u) => {
                return (
                  <Chip key={u.id} color="success" variant="shadow" size="lg">
                    {u.naam}
                  </Chip>
                );
              })}
          </div>
        </div>
        <div className="pt-2 ps-2">
          <div className="font-bold  underline text-xl">Deelnemer(s)</div>
          <div className="p-2 flex gap-4">
            {deelnemers.filter((u) => !u.isOrganisator).length ? (
              deelnemers
                .filter((u) => !u.isOrganisator)
                .map((u) => {
                  return (

                    <Chip key={u.id} color="success" variant="shadow" size="lg">
                      {u.naam}
                    </Chip>

                  );
                })
            ) : (
              <p>Nog geen deelnemers</p>
            )}
          </div>
        </div>
        {!!currentUser.isOrganisator ? (
          <div className="mt-3 mb-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="ps-2">
              <Button
                as={Link}
                href={`/Missie/DeelnemersBewerken/${missieId}`}
                className="w-full"
                color="primary"
              >
                Bewerken
              </Button>
            </div>
            <div className="sm:col-span-5"></div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ToonDeelnemers;
