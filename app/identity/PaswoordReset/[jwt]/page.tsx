import { Link, Image } from "@nextui-org/react";
import PaswoordResetForm from "./form";
import { verifyJwt } from "@/lib/jwt";

interface Props {
  params: {
    jwt: string;
  };
}

const PaswoordReset = ({ params }: Props) => {
  const payload = verifyJwt(params.jwt);
  if (!payload)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-2xl">
        Deze link is niet geldig!
      </div>
    );

  return (
    <div className="flex justify-center">
      <PaswoordResetForm jwtUserId={params.jwt} />
    </div>
  );
};

export default PaswoordReset;
