"use client";
import {
  addHours,
  addMinutes,
  fromUnixTime,
  getUnixTime,
  setHours,
  setMinutes,
} from "date-fns";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AfbeeldingNieuweEtappe from "../../afbeeldingen/NieuweEtappe.jpg";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
  Textarea,
  TimeInput,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { PostNieuweEtappe } from "@/lib/actions/MissieEtappeActions";

const formSchema = z.object({
  titel: z.string().min(1, "Geef de missie een titel"),
  omschrijving: z
    .string()
    .min(1, "Geef een korte omschrijving van de missie")
    .optional(),
  locatie: z
    .string()
    .min(1, "Geef een korte omschrijving van de missie")
    .optional(),
  startTijd: z.string().time("Gelieve een starttijd in te geven"),
  eindTijd: z.string().time("Gelieve een eindtijd in te geven"),
  kost: z.number(),
});
type InputType = z.infer<typeof formSchema>;

interface Props {
  deelnemers: MissieDeelnemerModel[];
  missieid: number;
  datum: Date;
}
interface missieDeelnemer {
  id: string;
  naam: string;
  verschuldigd: boolean;
}
const EtappeNieuwForm = ({ deelnemers, missieid, datum }: Props) => {
  const router = useRouter();
  const [verschuldigdDoor, setVerschuldigdDoor] = useState<string[]>([]);
  const [betalerslijst, setBetalersLijst] = useState<MissieDeelnemerModel[]>(
    []
  );
  const [betaler, setBetaler] = useState<string>("clxucmprp0002p31rf6p6mux3");
  useEffect(() => {
    let arrDeel: string[] = [];
    let betLijst: MissieDeelnemerModel[] = [
      {
        id: "clxucmprp0002p31rf6p6mux3",
        naam: "Rekening Argenta",
        isOrganisator: false,
      },
    ];
    deelnemers.map((deel) => {
      arrDeel.push(deel.id);
      betLijst.push(deel);
    });
    setVerschuldigdDoor(arrDeel);
    setBetalersLijst(betLijst);
  }, [deelnemers]);

  let [starttijdValue, setStarttijdValue] = useState(
    parseAbsoluteToLocal(datum.toISOString())
  );
  let [eindtijdValue, setEindtijdValue] = useState(
    parseAbsoluteToLocal(datum.toISOString())
  );

  const bewaarEtappe: SubmitHandler<InputType> = async (data) => {
    console.log(data);
    try {
      const model: PostEtappeNieuwModel = {
        missieid: missieid,
        titel: data.titel,
        omschrijving: data.omschrijving,
        locatie: data.locatie,
        startDatum: new Date(starttijdValue.toString()),
        eindDatum: new Date(eindtijdValue.toString()),
        kost: data.kost,
        verschuldigDoor: verschuldigdDoor,
        betaler: betaler,
      };
      console.log(model);
      // const result = await PostNieuweEtappe(model);
      // if (data.kost === 0) {
      //   router.push(`/Missie/Gegevens/${missieid}`);
      // }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(`${error.message}`);
      }
    }
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const BetalerAanpassen = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBetaler(e.target.value);
  };
  return (
    <>
      <section className="pt-5">
        <div className="p-3">
          <form
            onSubmit={handleSubmit(bewaarEtappe)}
            className="w-full p-5 border"
          >
            <div className="mb-1 sm:mb-5 align-middle">
              <Input
                {...register("titel")}
                errorMessage={errors.titel?.message}
                isInvalid={!!errors.titel}
                label="Algemene titel"
                className="col-span-2"
              />
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <Textarea
                {...register("omschrijving")}
                errorMessage={errors.omschrijving?.message}
                isInvalid={!!errors.omschrijving}
                label="Korte omschrijving"
                className="col-span-2"
              />
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <Input
                {...register("locatie")}
                errorMessage={errors.locatie?.message}
                isInvalid={!!errors.locatie}
                label="Algemene locatie"
                className="col-span-2"
              />
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <TimeInput
                label="Starttijd"
                hideTimeZone
                hourCycle={24}
                value={starttijdValue}
                errorMessage={errors.startTijd?.message}
                onChange={(e) => {
                  console.log(e.toAbsoluteString());

                  setValue(
                    "startTijd",
                    `${e.hour.toString().padStart(2, "0")}:${e.minute
                      .toString()
                      .padStart(2, "0")}:00`
                  );
                  setValue(
                    "eindTijd",
                    `${e.hour.toString().padStart(2, "0")}:${e.minute
                      .toString()
                      .padStart(2, "0")}:00`
                  );

                  let tijd = `${e.hour.toString().padStart(2, "0")}:${e.minute
                    .toString()
                    .padStart(2, "0")}:00`;
                  let tijdArr = tijd.split(":");

                  let dat = setHours(datum, Number(tijdArr[0]));
                  dat = setMinutes(dat, Number(tijdArr[1]));
                  //console.log(dat);
                  setStarttijdValue(parseAbsoluteToLocal(dat.toISOString()));
                  setEindtijdValue(parseAbsoluteToLocal(dat.toISOString()));
                }}
              ></TimeInput>
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <TimeInput
                label="Eindtijd"
                hideTimeZone
                hourCycle={24}
                value={eindtijdValue}
                errorMessage={errors.eindTijd?.message}
                onChange={(e) => {
                  setValue(
                    "eindTijd",
                    `${e.hour.toString().padStart(2, "0")}:${e.minute
                      .toString()
                      .padStart(2, "0")}:00`
                  );

                  let uur = e.hour;
                  let minuut = e.minute;
                  let start = datum.setHours(uur, minuut);
                  
                  console.log(fromUnixTime(start/1000));


                  let tijd = `${e.hour.toString().padStart(2, "0")}:${e.minute
                    .toString()
                    .padStart(2, "0")}:00`;
                  let tijdArr = tijd.split(":");

                  let dat = setHours(datum, Number(tijdArr[0]));
                  dat = setMinutes(dat, Number(tijdArr[1]));

                  setEindtijdValue(parseAbsoluteToLocal(dat.toISOString()));
                }}
              ></TimeInput>
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <Input
                {...register("kost", { valueAsNumber: true })}
                errorMessage={errors.kost?.message}
                isInvalid={!!errors.kost}
                label="Kost"
                type="number"
                value="0.00"
                className="col-span-2"
              />
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <Select
                label="Wie heeft betaald"
                aria-label="Betaler"
                variant="flat"
                onChange={BetalerAanpassen}
              >
                {betalerslijst?.map((deel) => (
                  <SelectItem key={deel.id} value={deel.id}>
                    {deel.naam}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <CheckboxGroup
                label="Verschuldigd door"
                value={verschuldigdDoor}
                onValueChange={setVerschuldigdDoor}
                color="success"
              >
                {deelnemers.map((deel) => (
                  <Checkbox value={deel.id} key={deel.id}>
                    {deel.naam}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
            <div className="mb-5 mt-5 w-full">
              <Button
                className="w-full"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Etappe wordt bewaard" : "Bewaar"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EtappeNieuwForm;
