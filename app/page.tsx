import { ZendMail } from "@/lib/actions/ZendMail";
import Image from "next/image";

export default async function Home() {
  //await ZendMail({to:"kenneth@haspeel.be",body:"testbody",subject:"testsubject"})
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <p>dit is de homepage</p>
      </div>
    </main>
  );
}
