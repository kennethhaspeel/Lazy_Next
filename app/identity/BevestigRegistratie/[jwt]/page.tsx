import { activateUser } from "@/lib/actions/identityActions"

interface Props {
  params: {
    jwt: string;
  };
}

const ActivationPage = async ({ params }: Props) => {
  const result = await activateUser(params.jwt);
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {result === "userNotExist" ? (
        <p className="text-red-500 text-2xl">Gebruiker niet gevonden in database</p>
      ) : result === "alreadyActivated" ? (
        <p className="text-red-500 text-2xl">Emailadres al bevestigd</p>
      ) : result === "success" ? (
        <p className="text-green-500 text-2xl">
          Perfect !! Uw email is bevestigd
        </p>
      ) : (
        <p className="text-yellow-500 text-2xl">Oeps! Er is iets misgelopen!</p>
      )}
    </div>
  );
};

export default ActivationPage