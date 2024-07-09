"use client";
import { fromUnixTime } from "date-fns";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AfbeeldingNieuweEtappe from "../../afbeeldingen/NieuweEtappe.jpg";
import { Button, Input, Textarea, TimeInput } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  parseAbsoluteToLocal,
  Time,
  ZonedDateTime,
} from "@internationalized/date";
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

const page = () => {
  const searchParams = useSearchParams();
  const missieid = Number(searchParams.get("missieid"));
  const datum = fromUnixTime(Number(searchParams.get("d")));
  const router = useRouter();
  let [starttijdValue, setStarttijdValue] = useState(
    parseAbsoluteToLocal(datum.toISOString())
  );
  let [eindtijdValue, setEindtijdValue] = useState(
    parseAbsoluteToLocal(datum.toISOString())
  );
  const bewaarEtappe: SubmitHandler<InputType> = async (data) => {
    console.log(data)
    try {
      const model: PostEtappeNieuwModel = {
        missieid: missieid,
        titel: data.titel,
        omschrijving: data.omschrijving,
        locatie: data.locatie,
        startDatum: new Date(starttijdValue.toString()),
        eindDatum: new Date(eindtijdValue.toString()),
        kost: data.kost,
      };
      const result = await PostNieuweEtappe(model);
      if (data.kost === 0) {
        router.push(`/Missie/Gegevens/${missieid}`);
      }
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
  return (
    <>
      <section className="pt-5">
        <p className="text-3xl pb-4 text-center">Nieuwe Etappe</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
                  onChange={(e) => {
                    setStarttijdValue(
                      parseAbsoluteToLocal(e.toAbsoluteString())
                    );
                    setValue("startTijd",e.toAbsoluteString())
                    setEindtijdValue(
                      parseAbsoluteToLocal(e.toAbsoluteString())
                    );
                  }}
                ></TimeInput>
              </div>
              <div className="mb-1 sm:mb-5 align-middle">
                <TimeInput
                  label="Eindtijd"
                  hideTimeZone
                  hourCycle={24}
                  value={eindtijdValue}
                  onChange={(e) => {
                    setValue("eindTijd",e.toAbsoluteString())
                    setEindtijdValue(
                      parseAbsoluteToLocal(e.toAbsoluteString())
                    );
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
          <div className="hidden md:block p-3">
            <Image
              src={AfbeeldingNieuweEtappe}
              alt="editformafbeelding"
              className="h-auto max-w-50"
              placeholder="blur"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
