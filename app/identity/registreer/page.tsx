import { Link, Image } from "@nextui-org/react";
import RegistreerForm from "./form";

const Registreer = () => {
  return (
    <section className="mt-6 mx-auto max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 place-items-center items-center">
        <div className="md:col-span-2 flex justify-center items-center">
          <p className="text-center p-2">Al geregistreerd?</p>
          <Link href={"/identity/login"}>Log In</Link>
        </div>
        <RegistreerForm />
        <Image
          src="/Afbeeldingen/identity/iwantyou.jpg"
          alt="loginform"
          width={300}
          height={400}
        />
      </div>
    </section>
  );
};

export default Registreer;
