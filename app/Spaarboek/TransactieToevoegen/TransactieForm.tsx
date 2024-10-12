"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinTransactie, Prisma, SpaarTransactie, User } from "@prisma/client";
import {
  Button,
  DateInput,
  Input,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { useEffect, useState ,useRef} from "react";
import { DDMMYYYYtoDate } from "@/app/components/DatumHelper";
import { getUnixTime } from "date-fns";
import {
  PostTransactie,
  PostTransactieSpaarboek,
} from "@/lib/actions/FinancieelActions";

import { prisma } from "@/lib/prisma";
import { toast } from "react-toastify";

const formSchema = z.object({
  mededeling: z.string().optional(),
  user: z.string().optional(),
  datum: z.string().transform((d) => getUnixTime(DDMMYYYYtoDate(d))),
  kost: z.number(),
});
type InputType = z.infer<typeof formSchema>;

interface Props {
  users: User[];
}
const TransactieForm = ({ users }: Props) => {
  const [user, setUser] = useState("");
  const [userslijst, setUserslijst] = useState<MissieDeelnemerModel[]>(
    []
  );

  const BewaarTransactie: SubmitHandler<InputType> = async (data) => {
    const d: PostTransactieSpaarboekModel = {
      userId: user,
      bedrag: data.kost,
      datum: data.datum,
      mededeling: data.mededeling ? data.mededeling : "Storting",

    };
    try {
      const SpaarboekTransactie = await PostTransactieSpaarboek(d);
      const fTransactie = await PostTransactie(d);

      toast.success("Transactie werd bewaard...");
      reset();
    } catch (error) {
      toast.error("Fout bij bewaren");
      console.log(error);
    }
  };
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(formSchema),
  });

  const userInstellen = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(e.target.value);
  };
  useEffect(()=>{
    let betLijst: MissieDeelnemerModel[] = [
      {
        id: "clxucmprp0002p31rf6p6mux3",
        naam: "Rekening Argenta",
        isOrganisator: false,
      },
    ];
    users.map((u)=>{
      betLijst.push({
        id: u.id,
        naam: `${u.voornaam} ${u.naam}`,
        isOrganisator: false
      })
    })
    setUserslijst(betLijst)
  },[users])
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <section className="pt-5">
        <div className="p-3">
          <form
            onSubmit={handleSubmit(BewaarTransactie)}
            className="w-full p-5 border"
          >
            <div className="mb-1 sm:mb-5 align-middle">
              <Select
                label="Gebruiker"
                aria-label="Betaler"
                variant="flat"
                onChange={userInstellen}

              >
                {userslijst.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {`${item.naam}`}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <Input
                {...register("kost", { valueAsNumber: true })}
                errorMessage={errors.kost?.message}
                isInvalid={!!errors.kost}
                label="Bedrag"
                type="number"
                className="col-span-2"
              />
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <Input
                {...register("datum")}
                errorMessage={errors.datum?.message}
                isInvalid={!!errors.datum}
                label="Datum"
                className="col-span-2"
              />
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <Input
                {...register("mededeling")}
                errorMessage={errors.mededeling?.message}
                isInvalid={!!errors.mededeling}
                label="Mededeling"
                className="col-span-2"
              />
            </div>
            <div className="mb-5 mt-5 w-full">
              <Button
                className="w-full"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Transactie wordt bewaard" : "Bewaar"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default TransactieForm;
