"use client";

import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
} from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useRouter } from "next/navigation";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Dit lijkt geen geldig email adres te zijn"),
  paswoord: z.string({ required_error: "Gelieve uw paswoord in te geven" }),
});

type InputType = z.infer<typeof FormSchema>;

const LoginForm = (props: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  const [isZichtbaar, setIsZichtbaar] = useState(false);
  const toggleIsZichtbaar = () => setIsZichtbaar((prev) => !prev);

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      paswoord: data.paswoord,
    });
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success("U bent met succes ingelogd...");
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  };
  return (
    <>
      <form className="flex flex-col gap-2 p-2 border rounded-md shadow max-w-3xl mx-auto justify-between" onSubmit={handleSubmit(onSubmit)}>
        <Input
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          {...register("email")}
          label="Email"
          className="col-span-2"
          startContent={<EnvelopeIcon className="w-4" />}
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
        <div className="flex items-center justify-center gap-2">
          <Button
            color="primary"
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? "U wordt ingelogd" : "Log in"}
          </Button>
          <Button as={Link} href="/auth/registreer">
            Registreer
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
