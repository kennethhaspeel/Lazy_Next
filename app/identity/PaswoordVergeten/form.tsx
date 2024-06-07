"use client"

import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod"
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { VergetenPaswoord } from "@/lib/actions/identityActions";


const FormSchema = z.object({
    email: z.string().email("Please enter a valid email!"),
  });
  
  type InputType = z.infer<typeof FormSchema>;

  const PaswoordVergetenForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
      } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
      });
    
      const submitRequest: SubmitHandler<InputType> = async (data) => {
        try {
          const result = await VergetenPaswoord(data.email);
          toast.success("Een link is verstuurd naar uw emailadres");
          reset();
        } catch (error) {
            if(error instanceof Error){
                toast.error(`${error.message}`)
                console.log(error.message)
            }
        }
      };
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 items-center">
          <form
            className="grid grid-cols-2 gap-3 p-2 place-self-stretch shadow border rounded-md"
            onSubmit={handleSubmit(submitRequest)}
          >
            <div className="text-center p-2">Uw emailadres</div>
            <Input
              label="Email"
              {...register("email")}
              startContent={<EnvelopeIcon className="w-4" />}
              errorMessage={errors.email?.message}
              className="col-span-2"
            />
            <div className="flex col-span-2 justify-center">
            <Button
            className="w-48"
              isLoading={isSubmitting}
              type="submit"
              disabled={isSubmitting}
              color="primary"
            >
              {isSubmitting ? "Even geduld..." : "Verstuur"}
            </Button>
            </div>


          </form>
          
          <Image
            src={"/Afbeeldingen/identity/paswoordvergeten2.jpg"}
            alt="paswoord vergeten"
            width={300}
            height={300}
            className="col-span-2 place-self-center"
          />
        </div>
      );
}

export default PaswoordVergetenForm