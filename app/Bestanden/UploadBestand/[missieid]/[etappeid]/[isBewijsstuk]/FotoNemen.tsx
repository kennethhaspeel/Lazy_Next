"use client";
import React, {
  ChangeEvent,
  SetStateAction,
  Dispatch,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import {
  BewaarMissieBestand,
  UpdateMissieAfbeeldingRecord,
  UploadFoto,
} from "@/app/components/BewaarBestandDB";
import { getUnixTime } from "date-fns";
import {
  BestandNaarImagekit,
  getBase64,
  UploadImage,
} from "@/app/components/ImageHelper";

interface Props {
  setToonUploadKeuzes: Dispatch<SetStateAction<boolean>>;
  setAllesBewaard: Dispatch<SetStateAction<boolean>>;
  missieid: number;
  etappeid: number;
  isBewijsstuk: boolean;
  currentUser: string;
  naam?: string;
  voornaam?: string;
}
const FotoNemen = ({
  setToonUploadKeuzes,
  setAllesBewaard,
  missieid,
  etappeid,
  currentUser,
  naam,
  voornaam,
  isBewijsstuk,
}: Props) => {
  const [NeemFotoSrc, setNeemFotoSrc] = useState<string | null>(null);
  const triggerNeemFoto = useRef<HTMLInputElement>(null);

  const triggerFunction = () => {
    triggerNeemFoto.current!.click();
  };
  useEffect(() => {
    triggerNeemFoto.current!.click();
  }, []);

  const ToonVoorbeeldNeemFoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      throw new Error("Geen foto geselecteerd");
    }
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNeemFotoSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function BewaarFoto() {
    if (NeemFotoSrc) {
      if (etappeid == 0) {
        const result = JSON.parse(await UploadFoto(NeemFotoSrc, []));
        const update = await UpdateMissieAfbeeldingRecord({
          missieid: missieid,
          bestandsnaam: result["name"],
        });
      } else {
        NeemFotoSrc;
        const tags: string[] = [naam!, voornaam!];
        const result = JSON.parse(await UploadFoto(NeemFotoSrc, tags));
        console.log(result);
        const dbdata = {
          missieEtappeId: Number(etappeid),
          bestandsNaam: result.name,
          mime: result.fileType,
          url: result.url,
          width: result.width,
          height: result.height,
          size: result.size,
          fileId: result.fileId,
          uploadDatum: getUnixTime(new Date()),
          userId: currentUser,
          isBewijsstuk: isBewijsstuk === true,
        };
        const dbResult = await BewaarMissieBestand(dbdata);
      }
      setToonUploadKeuzes(true);
      setAllesBewaard(true);
    }
  }
  return (
    <>
      <div>
        <form hidden>
          <input
            ref={triggerNeemFoto}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={ToonVoorbeeldNeemFoto}
            name="image"
          />
        </form>
      </div>
      <div>
        {NeemFotoSrc && (
          <div className="flex justify-center items-center">
            <Image
              src={NeemFotoSrc}
              alt="voorbeeld"
              height={0}
              width={0}
              sizes="100vw"
              style={{
                width: "auto",
                height: "auto",
                maxHeight: "600px",
              }}
            />
          </div>
        )}
      </div>
      <div className="flex w-full justify-items-stretch gap-4  pt-4">
        <div className="grow">
          <Button
            className="w-full"
            color="danger"
            onClick={() => {
              setToonUploadKeuzes(true);
            }}
          >
            Annuleer
          </Button>
        </div>
        <div className="grow">
          <Button
            className="w-full"
            color="warning"
            onClick={() => triggerFunction()}
          >
            Opnieuw
          </Button>
        </div>
        <div className="grow">
          <Button
            className="w-full"
            color="success"
            isDisabled={NeemFotoSrc == null}
            onClick={() => BewaarFoto()}
          >
            Bewaren
          </Button>
        </div>
      </div>
    </>
  );
};

export default FotoNemen;
