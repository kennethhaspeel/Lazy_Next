import PaswoordVergetenForm from "./form";
import Afbeelding from "../../afbeeldingen/paswoordvergeten.jpg";
import Image from "next/image";
const PaswoordVergetenPage = () => {
  return (
    <main className="pt-5 flex">
      <div className="flex-1 p-4 flex flex-col  items-center">
        <div className="text-xl font-bold mb-4">Paswoord Vergeten</div>
        <div className="w-full">
          <PaswoordVergetenForm />
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
      </main>
  );
};

export default PaswoordVergetenPage;
