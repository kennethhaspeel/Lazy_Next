"use client";

import { Button, DateRangePicker, Input, Textarea } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DateToYYYYMMDDstring,
  YYYYMMDDtoDate,
} from "@/app/components/DatumHelper";
import { getLocalTimeZone } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { PostMissieNieuw } from "@/lib/actions/MissieActions";
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  titel: z.string().min(1, "Geef de missie een titel"),
  omschrijving: z.string().min(1, "Geef een korte omschrijving van de missie"),
  startDatum: z.string().date("Gelieve een startdatum in te geven"),
  eindDatum: z.string().date("Gelieve een einddatum in te geven"),
  locatie: z.string().min(1, "Geef een korte omschrijving van de missie"),
});

type InputType = z.infer<typeof formSchema>;
interface Props {
  userid: string;
}
const FormMissieNieuw = ({ userid }: Props) => {
  const router = useRouter()
  const bewaarMissie: SubmitHandler<InputType> = async (data) => {
    try {
      const model: PostMissieNieuwModel = {
        titel: data.titel,
        omschrijving: data.omschrijving,
        startDatum: YYYYMMDDtoDate(data.startDatum),
        eindDatum: YYYYMMDDtoDate(data.eindDatum),
        locatie: data.locatie,
        publiekZichtbaar: false,
        deelnemer: {
          id: userid,
          isOrganisator: true,
          naam: "",
        },
      };
      const result = await PostMissieNieuw(model);
      router.push(`/missies/MissieDetail/${result}`)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
        console.log(error.message);
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
      <form onSubmit={handleSubmit(bewaarMissie)} className="w-full p-5 border">
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
          <I18nProvider locale="nl-BE">
            <DateRangePicker
              label="Start- en einddatum"
              onChange={(e) => {
                setValue(
                  "startDatum",
                  DateToYYYYMMDDstring(e.start.toDate(getLocalTimeZone()))
                );
                setValue(
                  "eindDatum",
                  DateToYYYYMMDDstring(e.end.toDate(getLocalTimeZone()))
                );
              }}
            />
          </I18nProvider>
        </div>
        <div className="mb-5 mt-5 w-full">
          <Button
            className="w-full"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Missie wordt verwerkt" : "Bewaar"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default FormMissieNieuw;
