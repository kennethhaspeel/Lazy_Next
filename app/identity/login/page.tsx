import React from "react";
import LoginForm from "./form";
import Link from "next/link";
import Afbeelding from "../../afbeeldingen/login_afbeelding.jpg";
import Image from "next/image";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}
const SigninPage = ({ searchParams }: Props) => {
  return (
    <div className="pt-5 flex">
      <div className="flex-1 p-4  flex-col  items-center">
        <div className="text-xl font-bold mb-4">Log in</div>
        <div className="w-full">
          <LoginForm />
        </div>
        
      </div>
      <div className="hidden md:flex md:flex-1 md:max-w-full">
        <Image
          src={Afbeelding}
          alt="loginafbeelding"
          className="h-auto max-w-full"
          placeholder="blur"
          fill={false}
        />
      </div>
    </div>
  );
};

export default SigninPage;
