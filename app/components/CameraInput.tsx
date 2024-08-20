"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { UploadFoto, UpdateMissieAfbeeldingRecord } from "./BewaarFoto";
import { User } from "next-auth";
interface Props {
  missieid: number;
  etappeid: number;
  currentUser: User;
  isMissieAfbeelding: boolean;
}

export default function CameraCapture({ missieid,etappeid, currentUser,isMissieAfbeelding }: Props) {
  const [image, setImage] = useState<string | null>(null);
  const [afbeelding, setAfbeelding] = useState<File | null>(null);
  const [verbergNeemFoto, setVerbergNeemFoto] = useState(false);
  const [Saving, setSaving] = useState(false);
  const triggerFoto = useRef<HTMLInputElement>(null);

  const handleCapture = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      throw new Error("Geen foto geselecteerd");
    }
    const file = event.target.files[0];
    setAfbeelding(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function BewaarFoto() {
    setSaving(true);
    const data = new FormData();
    data.append("image", afbeelding!);
    const result = JSON.parse(await UploadFoto(data));
    if(isMissieAfbeelding){
          const update = await UpdateMissieAfbeeldingRecord({
      missieid: missieid,
      bestandsnaam: result["name"],
    });
    } else {
      
    }

  }

  return (
    <div>
      <form hidden action={BewaarFoto}>
        <input
          ref={triggerFoto}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCapture}
          name="image"
        />
        <input type="text" name="missieid" value={missieid} readOnly />
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
                <Button
                  className="w-full"
                  onClick={() => BewaarFoto()}
                  isLoading={Saving}
                >
                  Bewaar
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
