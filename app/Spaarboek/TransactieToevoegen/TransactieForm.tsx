"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinTransactie, Prisma, SpaarTransactie, User } from "@prisma/client";
import {
  Button,
  CalendarDate,
  DateInput,
  Input,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import {
  DateToYYYYMMDDstring,
  DDMMYYYYtoDate,
  YYYYMMDDtoDate,
} from "@/app/components/DatumHelper";
import { getUnixTime } from "date-fns";
import {
  PostTransactie,
  PostTransactieSpaarboek,
} from "@/lib/actions/FinancieelActions";

import { prisma } from "@/lib/prisma";
import { toast } from "react-toastify";
import { parseAbsolute, parseDate } from "@internationalized/date";

const formSchema = z.object({
  mededeling: z.string().default("Storting"),
  user: z.string({ required_error: "Gelieve een gebruiker te selecteren" }),
  //datum: z.string().transform((d) => getUnixTime(DDMMYYYYtoDate(d))),
  datum: z.string().date("Gelieve een datum in te geven"),
  kost: z.number(),
});
type InputType = z.infer<typeof formSchema>;

interface Props {
  users: User[];
}
const TransactieForm = ({ users }: Props) => {
  const [user, setUser] = useState<string | null>(null);
  const [mededeling, setMededeling] = useState<string>("Storting");
  const [userslijst, setUserslijst] = useState<MissieDeelnemerModel[]>([]);
  const [isKost,setIsKost]=useState<boolean>(false)
  const [datum, setDatum] = useState(
    parseDate(DateToYYYYMMDDstring(new Date()))
  );

  const BewaarTransactie: SubmitHandler<InputType> = async (data) => {
    const d: PostTransactieSpaarboekModel = {
      userId: data.user,
      bedrag: data.kost,
      datum: getUnixTime(YYYYMMDDtoDate(data.datum)),
      mededeling: data.mededeling ? data.mededeling : "Storting",
    };
    try {
      const SpaarboekTransactie = await PostTransactieSpaarboek(d);
      !isKost && await PostTransactie(d);

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
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(formSchema),
  });

  const userInstellen = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(e.target.value);
  };
  useEffect(() => {
    let betLijst: MissieDeelnemerModel[] = [
      {
        id: "clxucmprp0002p31rf6p6mux3",
        naam: "Rekening Argenta",
        isOrganisator: false,
      },
    ];
    users.map((u) => {
      betLijst.push({
        id: u.id,
        naam: `${u.voornaam} ${u.naam}`,
        isOrganisator: false,
      });
    });
    setUserslijst(betLijst);
  }, [users]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <section className="pt-5">
        <div className="p-3">
          <form
            onSubmit={handleSubmit(BewaarTransactie)}
            className="w-full p-5 border"
          >
            <div className="mb-1 sm:mb-5 align-middle">
            <Switch isSelected={isKost} onValueChange={setIsKost}>
        Kost ?
      </Switch>
      </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <Select
                {...register("user")}
                label="Gebruiker"
                aria-label="Betaler"
                variant="flat"
                onChange={(e) => {
                  setUser(e.target.value);
                  setValue("user", e.target.value);
                }}
                errorMessage={errors.user?.message}
                isInvalid={!!errors.user}
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
              <DateInput
                {...register("datum")}
                label={"Datum"}
                value={datum}
                onChange={(e) => {
                  setDatum(e);
                  setValue("datum", e.toString());
                }}
                errorMessage={errors.datum?.message}
                isInvalid={!!errors.datum}
              />
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <Input
                {...register("mededeling", {
                  required:true,
                  validate: (value) => value.length > 5,
                })}
                errorMessage={errors.mededeling?.message}
                isInvalid={!!errors.mededeling}
                label="Mededeling"
                className="col-span-2"
                value={mededeling}
                onChange={(e) => {
                  setValue("mededeling", e.target.value);
                  setMededeling(e.target.value);
                }}
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
