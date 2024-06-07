import React from "react";
import LoginForm from "./form";
import Link from "next/link";

interface Props {
    searchParams:{
        callbackUrl?:string
    }
}
const SigninPage = ({searchParams}:Props) => {
  return (
    <main >
      <div className="flex items-center justify-center flex-col">
        <LoginForm callbackUrl={searchParams.callbackUrl}/>
        <Link href={"/identity/PaswoordVergeten"}>Paswoord vergeten?</Link>
      </div>
    </main>
  );
};

export default SigninPage;
