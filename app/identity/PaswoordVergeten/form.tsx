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
          const result = await VergetenPaswoord(data.email.toLowerCase());
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
        <div>
          <form
            className="w-full p-5"
            onSubmit={handleSubmit(submitRequest)}
          >
            <div className="mb-5 align-middle">
             <Input
              label="Uw Email"
              {...register("email")}
              startContent={<EnvelopeIcon className="w-4" />}
              errorMessage={errors.email?.message}
              className="col-span-2"
            />             
            </div>

            <div className="mb-5 mt-5 w-full">
            <Button
            className="w-full"
              isLoading={isSubmitting}
              type="submit"
              disabled={isSubmitting}
              color="primary"
            >
              {isSubmitting ? "Even geduld..." : "Verstuur"}
            </Button>
            </div>


          </form>
        </div>
      );
}

export default PaswoordVergetenForm