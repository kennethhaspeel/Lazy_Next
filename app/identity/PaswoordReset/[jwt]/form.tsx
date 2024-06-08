"use client";

import { PaswoordInstellen } from "@/lib/actions/identityActions";
import { EyeIcon } from "@heroicons/react/20/solid";
import { EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import validator from "validator";
import { z } from "zod";

interface Props {
  jwtUserId: string;
}
const FormSchema = z
  .object({
    paswoord: z
      .string()
      .min(
        8,
        "Gelieve een paswoord in te geven van minimum 8 karakters waaronder minimum 1 hoofdletter, 1 kleine letter, 1 cijfer en 1 speciaal teken"
      )
      .refine(
        validator.isStrongPassword,
        "Uw paswoord moet uit minimum 8 karakters bestaan waaronder minimum 1 hoofdletter, 1 kleine letter, 1 cijfer en 1 speciaal teken"
      ),
    bevestigPaswoord: z.string().min(1, "Gelieve uw paswoord te bevestigen"),
  })
  .refine((data) => data.paswoord === data.bevestigPaswoord, {
    message: "Paswoord en de bevestiging komen niet overeen !!",
    path: ["bevestigPaswoord"],
  });

type InputType = z.infer<typeof FormSchema>;
const PaswoordResetForm = ({ jwtUserId }: Props) => {
  const [visiblePass, setVisiblePass] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  const resetPass: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await PaswoordInstellen(jwtUserId, data.paswoord);
      if (result === "success") toast.success("Uw paswoord werd ingesteld !")
      reset();
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(resetPass)}
      className="flex flex-col gap-2 p-2 m-2 border rounded-md shadow"
    >
      <div className="text-center p-2">Stel uw paswoord in</div>
      <Input
        type={visiblePass ? "text" : "password"}
        label="Password"
        {...register("paswoord")}
        errorMessage={errors.paswoord?.message}
        isInvalid={!!errors.paswoord}
        endContent={
          <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
            {visiblePass ? (
              <EyeSlashIcon className="w-4" />
            ) : (
              <EyeIcon className="w-4" />
            )}
          </button>
        }
      />
      <Input
        type={visiblePass ? "text" : "password"}
        label="Bevestig Paswoord"
        {...register("bevestigPaswoord")}
        errorMessage={errors.bevestigPaswoord?.message}
        isInvalid={!!errors.bevestigPaswoord}
      />
      <div className="flex justify-center">
        <Button
          isLoading={isSubmitting}
          type="submit"
          disabled={isSubmitting}
          color="primary"
        >
          {isSubmitting ? "Even geduld..." : "Versturen"}
        </Button>
      </div>
    </form>
  );
};
export default PaswoordResetForm