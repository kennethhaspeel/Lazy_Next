import Afbeelding from "../../afbeeldingen/signout.jpg";
import Image from "next/image";
import LoguitForm from "./form";

const LogUit = () => {
  return (
    <div className="pt-5 flex">
      <div className="flex-1 p-4  flex-col  items-center">
        <div className="w-full">
          <LoguitForm />
        </div>
        
      </div>
      <div className="hidden md:flex md:flex-1 md:max-w-full">
        <Image
          src={Afbeelding}
          alt="loguitafbeelding"
          className="h-auto max-w-full"
          placeholder="blur"
          fill={false}
        />
      </div>
    </div>
  );
};

export default LogUit;
