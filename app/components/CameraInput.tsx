import { Button } from "@nextui-org/react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

export default function CameraCapture() {
  const [image, setImage] = useState<string | null>(null);
  const [verbergNeemFoto, setVerbergNeemFoto] = useState(false);
  const triggerFoto = useRef<HTMLInputElement>(null);

  const handleCapture = (event: ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files){
      throw new Error("Geen foto geselecteerd")
    }
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result?);
      };
      reader.readAsDataURL(file);
    }
  };

  async function BewaarFoto(data: FormData) {
    "use server";
    const file = data.get("file") as unknown as File;
  }

  return (
    <div>
      <form hidden>
        <input
          ref={triggerFoto}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCapture}
          name="image"
        />
      </form>

      <div className="w-full" hidden={verbergNeemFoto}>
        <Button
          className="dark:hover:bg-slate-500 dark:hover:text-white p-2 rounded-lg transition-colors mt-3 w-full"
          onClick={() => {
            setVerbergNeemFoto(true);
            triggerFoto.current!.click();
          }}
        >
          Neem Foto
        </Button>
      </div>
      <div className="grid grid-cols-1">
        <div>
          {image && (
            <>
              <div>
                <div className="flex justify-center items-center text-xl pb-4">
                  Preview
                </div>
                <div className="flex justify-center items-center">
                  <Image
                    src={image}
                    alt="Captured"
                    height={450}
                    width={400}
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className="flex justify-between pt-6 gap-4">
                <Button
                  className="w-full inline-flex"
                  onClick={() => {
                    setImage(null);
                    triggerFoto.current!.click();
                  }}
                >
                  Opnieuw
                </Button>
                <Button className="w-full">Bewaar</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
