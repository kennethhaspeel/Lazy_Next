"use client";

import {
  Button,
  DateRangePicker,
  Input,
  Textarea,
  Radio,
  RadioGroup,
  ButtonGroup,
  cn,
  Checkbox,
} from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DateToYYYYMMDDstring,
  YYYYMMDDtoDate,
} from "@/app/components/DatumHelper";
import {
  today,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  getLocalTimeZone,
  parseDate,
} from "@internationalized/date";
import { I18nProvider, useDateFormatter } from "@react-aria/i18n";
import {
  GetMission,
  PostMissieNieuw,
  UpdateMissie,
} from "@/lib/actions/MissieActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  titel: z.string().min(1, "Geef de missie een titel"),
  omschrijving: z.string().min(1, "Geef een korte omschrijving van de missie"),
   locatie: z.string().min(1,"Geef een korte omschrijving van de missie"),
  startDatum: z.date({required_error:"Gelieve een startdatum in te geven"}),
  eindDatum: z.date({required_error:"Gelieve een einddatum in te geven"}),
 
});

type InputType = z.infer<typeof formSchema>;
interface Props {
  missieData: MissieModel;
}

const FormMissieBewerk = ({ missieData }: Props) => {
  const [zichtbaar, setZichtbaar] = useState(missieData.publiekZichtbaar);

  const router = useRouter();

  const bewaarMissie: SubmitHandler<InputType> = async (data) => {
    console.log(data);
    try {
      const model: PostMissieNieuwModel = {
        titel: data.titel,
        omschrijving: data.omschrijving,
        startDatum: YYYYMMDDtoDate(data.startDatum),
        eindDatum: YYYYMMDDtoDate(data.eindDatum),
        locatie: data.locatie,
        publiekZichtbaar: zichtbaar,
      };
      console.log(model);
      //   const result = await UpdateMissie(model);
      //   router.push(`/missies/MissieDetail/${missieData.id}`);
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
    values: {
      titel: missieData.titel,
      omschrijving: missieData.omschrijving ? missieData.omschrijving : "",
      locatie: missieData.locatie ? missieData.locatie : "",
      startDatum:missieData.startDatum,
      eindDatum: missieData.eindDatum,
    },
  });
  return (
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
        <Input
          {...register("startDatum")}
          errorMessage={errors.startDatum?.message}
          isInvalid={!!errors.startDatum}
          label="Algemene locatie"
          className="col-span-2"
        />
      </div>
      {/* <div className="mb-1 sm:mb-5 align-middle">
        <I18nProvider locale="nl-BE">
          <DateRangePicker
            label="Start- en einddatum"
            onChange={(e) => {
              setValue(
                "startDatum",
                e.start.toDate(getLocalTimeZone())
              );
              setValue(
                "eindDatum",
                e.end.toDate(getLocalTimeZone())
              );
            }}
            value={{
              start: parseDate(DateToYYYYMMDDstring({...register("startDatum")})),
              end: parseDate(DateToYYYYMMDDstring({...register("eindDatum")})),
            }}
          />
        </I18nProvider>
      </div> */}
      <div className="mb-1 sm:mb-5 align-middle">
        <Checkbox
          size="lg"
          color="primary"
          isSelected={zichtbaar}
          onValueChange={setZichtbaar}
        >
          Publiek Zichtbaar
        </Checkbox>
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
  );
};

export default FormMissieBewerk;
