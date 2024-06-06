"use client";

import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Button, Input } from "@nextui-org/react";
import  { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import validator from "validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistreerGebruiker } from "@/lib/actions/identityActions";
import { toast } from "react-toastify";
import RegistratieGelukt from "./RegistratieGelukt";
import RegistratieMislukt from "./RegistratieMislukt";

const formSchema = z
  .object({
    voornaam: z.string().min(1, "Gelieve uw voornaam in te geven"),
    naam: z.string().min(1, "Gelieve uw naam in te geven"),
    geheimeVraag: z.string().min(1, "Gelieve het antwoord in te geven"),
    telefoon: z.string().min(1, "Gelieve een telefoonnummer in te geven"),
    email: z.string().email("Dit lijkt geen geldig email adres te zijn"),
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

type InputType = z.infer<typeof formSchema>;

const RegistreerForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(formSchema),
  });
  const [isZichtbaar, setIsZichtbaar] = useState(false);
  const toggleIsZichtbaar = () => setIsZichtbaar((prev) => !prev);

  const bewaarGebruiker: SubmitHandler<InputType> = async (data) => {
    try {
        const result = await RegistreerGebruiker(data)
        toast.success(<RegistratieGelukt/>)
    } catch(error) {
       
        if(error instanceof Error){
            toast.error(`${error.message}`)
            console.log(error.message)
        }
        
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(bewaarGebruiker)}
        className="grid grid-cols-2 gap-3 p-2 place-self-stretch shadow border rounded-md"
      >
        <Input
          {...register("geheimeVraag")}
          errorMessage={errors.geheimeVraag?.message}
          isInvalid={!!errors.geheimeVraag}
          label="Antwoord op geheime vraag"
          className="col-span-2"
          startContent={<UserIcon className="w-4" />}
        />
        <Input
          errorMessage={errors.voornaam?.message}
          isInvalid={!!errors.voornaam}
          {...register("voornaam")}
          label="Voornaam"
          startContent={<UserIcon className="w-4" />}
        />
        <Input
          errorMessage={errors.naam?.message}
          isInvalid={!!errors.naam}
          {...register("naam")}
          label="Naam"
          startContent={<UserIcon className="w-4" />}
        />

        <Input
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          {...register("email")}
          label="Email"
          className="col-span-2"
          startContent={<EnvelopeIcon className="w-4" />}
        />
        <Input
          errorMessage={errors.telefoon?.message}
          isInvalid={!!errors.telefoon}
          {...register("telefoon")}
          label="Telefoon"
          className="col-span-2"
          startContent={<PhoneIcon className="w-4" />}
        />
        <Input
          errorMessage={errors.paswoord?.message}
          isInvalid={!!errors.paswoord}
          {...register("paswoord")}
          label="Paswoord"
          className="col-span-2"
          type={isZichtbaar ? "text" : "password"}
          startContent={<KeyIcon className="w-4" />}
          endContent={
            isZichtbaar ? (
              <EyeSlashIcon
                className="w-4 cursor-pointer"
                onClick={toggleIsZichtbaar}
              />
            ) : (
              <EyeIcon
                className="w-4 cursor-pointer"
                onClick={toggleIsZichtbaar}
              />
            )
          }
        />
        <Input
          errorMessage={errors.bevestigPaswoord?.message}
          isInvalid={!!errors.bevestigPaswoord}
          {...register("bevestigPaswoord")}
          label="Bevestig Paswoord"
          className="col-span-2"
          type={isZichtbaar ? "text" : "password"}
          startContent={<KeyIcon className="w-4" />}
        />
        <div className="flex justify-center col-span-2">
          <Button className="w-48" color="primary" type="submit">
            Registreer
          </Button>
        </div>
      </form>
    </>
  );
};

export default RegistreerForm;
