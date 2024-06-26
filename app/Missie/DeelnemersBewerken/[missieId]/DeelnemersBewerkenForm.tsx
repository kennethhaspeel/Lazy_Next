"use client";

import { UpdateMissieDeelnemers } from "@/lib/actions/MissieActions";
import { Button, ButtonGroup, Listbox } from "@nextui-org/react";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  missieData: MissieModel;
  allUsers: User[];
  currentUser: string;
}

const DeelnemersBewerkenForm = ({
  missieData,
  allUsers,
  currentUser,
}: Props) => {
  const router = useRouter();
  const [deelnemers, setDeelnemers] = useState<MissieDeelnemersModel[]>([]);
  const [bewaarknopDisabled, setBewaarknopDisabled] = useState<boolean>(true);
  const [OrgKnopDisabled, setOrgKnopDisabled] = useState<boolean>(false);
  const [isSubmitting, SetIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    let arrDeel: MissieDeelnemersModel[] = [];
    allUsers.map((u) => {
      const user = missieData.deelnemers.filter((deel) => deel.id == `${u.id}`);

      if (user.length > 0) {
        let temp: MissieDeelnemersModel = {
          id: u.id,
          naam: user[0].naam,
          deelnemer: true,
          organisator: user[0].isOrganisator,
        };
        arrDeel.push(temp);
      } else {
        let temp: MissieDeelnemersModel = {
          id: u.id,
          naam: `${u.voornaam} ${u.naam}`,
          deelnemer: false,
          organisator: false,
        };
        arrDeel.push(temp);
      }
    });
    setDeelnemers(arrDeel);
    orgKnopInstellen(arrDeel);
  }, [missieData]);

  const orgKnopInstellen = (arr: MissieDeelnemersModel[]) => {
    arr.filter((x) => x.organisator).length < 2
      ? setOrgKnopDisabled(true)
      : setOrgKnopDisabled(false);
  };

  const DeelnemerAanpassen = (
    id: string,
    isDeelnemer: boolean,
    isOrganisator: boolean
  ) => {
    let arr: MissieDeelnemersModel[] = [...deelnemers];
    let record = arr.find((x) => x.id === id);
    record!.deelnemer = isDeelnemer;
    record!.organisator = isOrganisator;
    setDeelnemers(arr);
    setBewaarknopDisabled(false);
    orgKnopInstellen(arr);
  };

  const BewaarWijzigingen = async () => {
    SetIsSubmitting(true);
    const model: UpdateMissieDeelnemerModel = {
      deelnemers: deelnemers,
      missieid: missieData.id,
    };
    let result = await UpdateMissieDeelnemers(model);
    router.push(`/Missie/Gegevens/${missieData.id}`);
  };
  return (
    <>
      <div className="text-2xl text-bold pb-3">
        Deelnemers Bewerken{" "}
        <Button
          color="success"
          isDisabled={bewaarknopDisabled}
          isLoading={isSubmitting}
          onClick={BewaarWijzigingen}
        >
          {isSubmitting ? "Wijzigingen worden bewaard" : "Bewaar"}
        </Button>
      </div>
      <p className="font-bold">Organisatoren</p>
      <div className="w-full md:max-w-[400px]">
        {deelnemers
          ?.filter((d) => d.organisator)
          .map((user) => (
            <ButtonGroup
              fullWidth={true}
              className="p-1"
              color="warning"
              key={user.id}
            >
              <Button key={`btn_up_${user.id}`} isDisabled>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                  />
                </svg>
              </Button>
              <Button key={`naam_${user.id}`}>{user.naam}</Button>
              <Button
                key={`btn_down_${user.id}`}
                onClick={() => {
                  DeelnemerAanpassen(user.id, true, false);
                }}
                isDisabled={user.id === currentUser || isSubmitting? true : OrgKnopDisabled}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </Button>
            </ButtonGroup>
          ))}
      </div>
      <p className="font-bold">Deelnemers</p>
      <div className="w-full md:max-w-[400px]">
        {deelnemers
          ?.filter((d) => !d.organisator && d.deelnemer)
          .map((user) => (
            <ButtonGroup
              fullWidth={true}
              className="p-1"
              color="warning"
              key={user.id}
            >
              <Button
                key={`btn_up_${user.id}`}
                onClick={() => {
                  DeelnemerAanpassen(user.id, true, true);
                }}
                isDisabled = {isSubmitting}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                  />
                </svg>
              </Button>
              <Button key={`naam_${user.id}`}>{user.naam}</Button>
              <Button
                key={`btn_down_${user.id}`}
                onClick={() => {
                  DeelnemerAanpassen(user.id, false, false);
                }}
                isDisabled={isSubmitting}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </Button>
            </ButtonGroup>
          ))}
      </div>
      <p className="font-bold">Niet Deelnemers</p>
      <div className="w-full md:max-w-[400px]">
        {deelnemers
          ?.filter((d) => !d.deelnemer)
          .map((user) => (
            <ButtonGroup
              key={user.id}
              fullWidth={true}
              className="p-1"
              color="warning"
            >
              <Button
                key={`btn_up_${user.id}`}
                onClick={() => {
                  DeelnemerAanpassen(user.id, true, false);
                }}
                isDisabled={isSubmitting}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                  />
                </svg>
              </Button>
              <Button key={`naam_${user.id}`}>{user.naam}</Button>
              <Button key={`btn_down_${user.id}`} isDisabled>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </Button>
            </ButtonGroup>
          ))}
      </div>
    </>
  );
};

export default DeelnemersBewerkenForm;
