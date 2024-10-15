"use client";
import {
  addHours,
  addMinutes,
  fromUnixTime,
  getUnixTime,
  setHours,
  setMinutes,
} from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { parseAbsoluteToLocal, Time } from "@internationalized/date";
import { PostUpdateEtappe } from "@/lib/actions/MissieEtappeActions";
const formSchema = z.object({
  titel: z.string().min(1, "Geef de missie een titel"),
  omschrijving: z.string().optional(),
  locatie: z.string().optional(),
  startTijd: z.string().time("Gelieve een starttijd in te geven"),
  kost: z.number(),
  url: z.string().optional(),
});
type InputType = z.infer<typeof formSchema>;

interface Props {
  deelnemers: MissieDeelnemerModel[];
  details: EtappeDetail;
}
const BewerkEtappeForm = ({ deelnemers, details }: Props) => {
  //console.log(details);
  const router = useRouter();
  const [verschuldigdDoor, setVerschuldigdDoor] = useState<string[]>([]);
  const [betalerslijst, setBetalersLijst] = useState<MissieDeelnemerModel[]>(
    []
  );
  const [betaler, setBetaler] = useState<string>("clxucmprp0002p31rf6p6mux3");

  let [starttijdValue, setStarttijdValue] = useState<Time>(new Time());

  let [datum, setDatum] = useState<Date>(new Date());
  const bewaarEtappe: SubmitHandler<InputType> = async (data) => {
    try {
      let d = datum;
      d.setHours(starttijdValue.hour);
      d.setMinutes(starttijdValue.minute);
      console.log(d);
      const model: PostEtappeNieuwModel = {
        missieid: details.id,
        titel: data.titel,
        omschrijving: data.omschrijving,
        locatie: data.locatie,
        startDatum: d,
        kost: data.kost,
        verschuldigDoor: data.kost > 0 ? verschuldigdDoor : [],
        betaler: data.kost > 0 ? betaler : "",
        url: data.url ? data.url : "",
      };
      //console.log(model);
      const result = await PostUpdateEtappe(model);
      //console.log(result);
      toast.success("Aanpassing Bewaard");
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
    details.betaaldDoor && setBetaler(details.betaaldDoor);
    let betLijst: MissieDeelnemerModel[] = [
      {
        id: "clxucmprp0002p31rf6p6mux3",
        naam: "Rekening Argenta",
        isOrganisator: false,
      },
    ];
    deelnemers.map((deel) => {
      //console.log(deel)
      betLijst.push(deel);
    });
    setBetalersLijst(betLijst);
    setVerschuldigdDoor(details.kostenverdeling);
    setDatum(fromUnixTime(details.startDatum));
    let dat = fromUnixTime(details.startDatum);
    let tijd = new Time(dat.getHours(), dat.getMinutes());
    setStarttijdValue(new Time(dat.getHours(), dat.getMinutes()));
  }, [deelnemers, details]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const BetalerAanpassen = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBetaler(e.target.value);
  };
  // useEffect(() => {
  //   console.log(verschuldigdDoor);
  // }, [verschuldigdDoor]);

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
                value={details.titel}
              />
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <Textarea
                {...register("omschrijving")}
                errorMessage={errors.omschrijving?.message}
                isInvalid={!!errors.omschrijving}
                label="Korte omschrijving"
                className="col-span-2"
                value={details.omschrijving}
              />
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <Textarea
                {...register("url")}
                errorMessage={errors.url?.message}
                isInvalid={!!errors.url}
                label="Link naar site"
                className="col-span-2"
                value={details.url}
              />
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <Input
                {...register("locatie")}
                errorMessage={errors.locatie?.message}
                isInvalid={!!errors.locatie}
                label="Algemene locatie"
                className="col-span-2"
                value={details.locatie}
              />
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <TimeInput
                {...register("startTijd")}
                errorMessage={errors.startTijd?.message}
                isInvalid={!!errors.startTijd}
                label="Starttijd"
                hideTimeZone
                hourCycle={24}
                value={starttijdValue}
                onFocus={(e) => {
                  setValue("startTijd", starttijdValue.toString());
                }}
                onChange={(e) => {
                  setValue(
                    "startTijd",
                    `${e.hour.toString().padStart(2, "0")}:${e.minute
                      .toString()
                      .padStart(2, "0")}:00`
                  );
                  setStarttijdValue(new Time(e.hour, e.minute));
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
                className="col-span-2"
                defaultValue={details.kost.toFixed(2)}
              />
            </div>
            <div className="mb-1 sm:mb-5 align-middle">
              <Select
                label="Wie heeft betaald"
                aria-label="Betaler"
                variant="flat"
                onChange={BetalerAanpassen}
                selectedKeys={[betaler]}
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
                {deelnemers
                  .filter((deel) => deel.id != "clxucmprp0002p31rf6p6mux3")
                  .map((deel) => (
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

export default BewerkEtappeForm;
