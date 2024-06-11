import RegistreerForm from "./form";
import Link from "next/link";
import Afbeelding from "../../afbeeldingen/registreerafbeelding.jpg";
import Image from "next/image";

const Registreer = () => {
  return (
    <section className="pt-5 flex">
      <div className="flex-1 p-4 flex flex-col  items-center">
        <div className="text-xl font-bold mb-4">Registreer</div>
        <div className="w-full">
          <RegistreerForm />
        </div>
      </div>
      <div className="hidden md:flex md:flex-1 md:max-w-full">
        <Image
          src={Afbeelding}
          alt="loginafbeelding"
          className="h-auto max-w-full"
          placeholder="blur"
        />
      </div>
    </section>
  );
};

export default Registreer;
